/*
 * Copyright 2016 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#pragma once

#include <cstring>

#include <array>
#include <functional>
#include <iosfwd>
#include <map>
#include <stdexcept>

#include <folly/Hash.h>
#include <folly/Range.h>
#include <folly/detail/IPAddress.h>

namespace folly {

class IPAddress;
class IPAddressV4;
class IPAddressV6;
class MacAddress;

/**
 * Pair of IPAddressV6, netmask
 */
typedef std::pair<IPAddressV6, uint8_t> CIDRNetworkV6;

/**
 * Specialization for IPv6 addresses
 */
typedef std::array<uint8_t, 16> ByteArray16;

/**
 * IPv6 variation of IPAddress.
 *
 * Added methods: createIPv4, getIPv4For6To4, is6To4,
 *                isTeredo, isIPv4Mapped, tryCreateIPv4, type
 *
 * @see IPAddress
 *
 * Notes on scope ID parsing:
 *
 * getaddrinfo() uses if_nametoindex() to convert interface names
 * into a numerical index. For instance,
 * "fe80::202:c9ff:fec1:ee08%eth0" may return scope ID 2 on some
 * hosts, but other numbers on other hosts. It will fail entirely on
 * hosts without an eth0 interface.
 *
 * Serializing / Deserializing IPAddressB6's on different hosts
 * that use link-local scoping probably won't work.
 */
class IPAddressV6 {
 public:
  // V6 Address Type
  enum Type {
    TEREDO, T6TO4, NORMAL,
  };
  // A constructor parameter to indicate that we should create a link-local
  // IPAddressV6.
  enum LinkLocalTag {
    LINK_LOCAL,
  };
  // Thrown when a type assertion fails
  typedef std::runtime_error TypeError;

  // Binary prefix for teredo networks
  static const uint32_t PREFIX_TEREDO;
  // Binary prefix for 6to4 networks
  static const uint32_t PREFIX_6TO4;

  // Size of std::string returned by toFullyQualified.
  static constexpr size_t kToFullyQualifiedSize =
    8 /*words*/ * 4 /*hex chars per word*/ + 7 /*separators*/;

  // returns true iff the input string can be parsed as an ipv6-address
  static bool validate(StringPiece ip);

  /**
   * Create a new IPAddress instance from the provided binary data.
   * @throws IPAddressFormatException if the input length is not 16 bytes.
   */
  static IPAddressV6 fromBinary(ByteRange bytes) {
    IPAddressV6 addr;
    addr.setFromBinary(bytes);
    return addr;
  }

  /**
   * Returns the address as a Range.
   */
  ByteRange toBinary() const {
    return ByteRange((const unsigned char *) &addr_.in6Addr_.s6_addr, 16);
  }

  /**
   * Default constructor for IPAddressV6.
   *
   * The address value will be ::0
   */
  IPAddressV6();

  // Create an IPAddressV6 from a string
  // @throws IPAddressFormatException
  //
  explicit IPAddressV6(StringPiece ip);

  // ByteArray16 constructor
  explicit IPAddressV6(const ByteArray16& src);

  // in6_addr constructor
  explicit IPAddressV6(const in6_addr& src);

  // sockaddr_in6 constructor
  explicit IPAddressV6(const sockaddr_in6& src);

  /**
   * Create a link-local IPAddressV6 from the specified ethernet MAC address.
   */
  IPAddressV6(LinkLocalTag tag, MacAddress mac);

  // return the mapped V4 address
  // @throws IPAddressFormatException if !isIPv4Mapped
  IPAddressV4 createIPv4() const;

  /**
   * Return a V4 address if this is a 6To4 address.
   * @throws TypeError if not a 6To4 address
   */
  IPAddressV4 getIPv4For6To4() const;

  // Return true if a 6TO4 address
  bool is6To4() const {
    return type() == IPAddressV6::Type::T6TO4;
  }

  // Return true if a TEREDO address
  bool isTeredo() const {
    return type() == IPAddressV6::Type::TEREDO;
  }

  // return true if this is v4-to-v6-mapped
  bool isIPv4Mapped() const;

  // Return the V6 address type
  Type type() const;

  /**
   * @see IPAddress#bitCount
   * @returns 128
   */
  static size_t bitCount() { return 128; }

  /**
   * @see IPAddress#toJson
   */
  std::string toJson() const;

  size_t hash() const;

  // @see IPAddress#inSubnet
  // @throws IPAddressFormatException if string doesn't contain a V6 address
  bool inSubnet(StringPiece cidrNetwork) const;

  // return true if address is in subnet
  bool inSubnet(const IPAddressV6& subnet, uint8_t cidr) const {
    return inSubnetWithMask(subnet, fetchMask(cidr));
  }
  bool inSubnetWithMask(const IPAddressV6& subnet,
                        const ByteArray16& mask) const;

  // @see IPAddress#isLoopback
  bool isLoopback() const;

  // @see IPAddress#isNonroutable
  bool isNonroutable() const {
    return !isRoutable();
  }

  /**
   * Return true if this address is routable.
   */
  bool isRoutable() const;

  // @see IPAddress#isPrivate
  bool isPrivate() const;

  /**
   * Return true if this is a link-local IPv6 address.
   *
   * Note that this only returns true for addresses in the fe80::/10 range.
   * It returns false for the loopback address (::1), even though this address
   * is also effectively has link-local scope.  It also returns false for
   * link-scope and interface-scope multicast addresses.
   */
  bool isLinkLocal() const;

  /**
   * Return true if this is a multicast address.
   */
  bool isMulticast() const;

  /**
   * Return the flags for a multicast address.
   * This method may only be called on multicast addresses.
   */
  uint8_t getMulticastFlags() const;

  /**
   * Return the scope for a multicast address.
   * This method may only be called on multicast addresses.
   */
  uint8_t getMulticastScope() const;

  // @see IPAddress#isZero
  bool isZero() const {
    constexpr auto zero = ByteArray16{{}};
    return 0 == std::memcmp(bytes(), zero.data(), zero.size());
  }

  bool isLinkLocalBroadcast() const;

  // @see IPAddress#mask
  IPAddressV6 mask(size_t numBits) const;

  // return underlying in6_addr structure
  in6_addr toAddr() const { return addr_.in6Addr_; }

  uint16_t getScopeId() const { return scope_; }
  void setScopeId(uint16_t scope) {
    scope_ = scope;
  }

  sockaddr_in6 toSockAddr() const {
    sockaddr_in6 addr;
    memset(&addr, 0, sizeof(sockaddr_in6));
    addr.sin6_family = AF_INET6;
    addr.sin6_scope_id = scope_;
    memcpy(&addr.sin6_addr, &addr_.in6Addr_, sizeof(in6_addr));
    return addr;
  }

  ByteArray16 toByteArray() const {
    ByteArray16 ba{{0}};
    std::memcpy(ba.data(), bytes(), 16);
    return ba;
  }

  // @see IPAddress#toFullyQualified
  std::string toFullyQualified() const;

  // @see IPAddress#str
  std::string str() const;

  // @see IPAddress#version
  size_t version() const { return 6; }

  /**
   * Return the solicited-node multicast address for this address.
   */
  IPAddressV6 getSolicitedNodeAddress() const;

  /**
   * Return the mask associated with the given number of bits.
   * If for instance numBits was 24 (e.g. /24) then the V4 mask returned should
   * be {0xff, 0xff, 0xff, 0x00}.
   * @param [in] numBits bitmask to retrieve
   * @throws abort if numBits == 0 or numBits > bitCount()
   * @return mask associated with numBits
   */
  static const ByteArray16 fetchMask(size_t numBits);
  // Given 2 IPAddressV6,mask pairs extract the longest common IPAddress,
  // mask pair
  static CIDRNetworkV6 longestCommonPrefix(
      const CIDRNetworkV6& one,
      const CIDRNetworkV6& two);
  // Number of bytes in the address representation.
  static constexpr size_t byteCount() { return 16; }

  //get nth most significant bit - 0 indexed
  bool getNthMSBit(size_t bitIndex) const {
    return detail::getNthMSBitImpl(*this, bitIndex, AF_INET6);
  }
  //get nth most significant byte - 0 indexed
  uint8_t getNthMSByte(size_t byteIndex) const;
  //get nth bit - 0 indexed
  bool getNthLSBit(size_t bitIndex) const {
    return getNthMSBit(bitCount() - bitIndex - 1);
  }
  //get nth byte - 0 indexed
  uint8_t getNthLSByte(size_t byteIndex) const {
    return getNthMSByte(byteCount() - byteIndex - 1);
  }

  const unsigned char* bytes() const { return addr_.in6Addr_.s6_addr; }
  protected:
  /**
   * Helper that returns true if the address is in the binary subnet specified
   * by addr.
   */
  bool inBinarySubnet(const std::array<uint8_t, 2> addr,
                      size_t numBits) const;

 private:
  union AddressStorage {
    in6_addr in6Addr_;
    ByteArray16 bytes_;
    AddressStorage() {
      std::memset(this, 0, sizeof(AddressStorage));
    }
    explicit AddressStorage(const ByteArray16& bytes): bytes_(bytes) {}
    explicit AddressStorage(const in6_addr& addr): in6Addr_(addr) {}
    explicit AddressStorage(MacAddress mac);
  } addr_;

  // Link-local scope id.  This should always be 0 for IPAddresses that
  // are *not* link-local.
  uint16_t scope_{0};

  static const std::array<ByteArray16, 129> masks_;

  /**
   * Set the current IPAddressV6 object to have the address specified by bytes.
   * @throws IPAddressFormatException if bytes.size() is not 16.
   */
  void setFromBinary(ByteRange bytes);
};

// boost::hash uses hash_value() so this allows boost::hash to work
// automatically for IPAddressV6
std::size_t hash_value(const IPAddressV6& addr);
std::ostream& operator<<(std::ostream& os, const IPAddressV6& addr);
// Define toAppend() to allow IPAddressV6 to be used with to<string>
void toAppend(IPAddressV6 addr, std::string* result);
void toAppend(IPAddressV6 addr, fbstring* result);

/**
 * Return true if two addresses are equal.
 */
inline bool operator==(const IPAddressV6& addr1, const IPAddressV6& addr2) {
  return (std::memcmp(addr1.toAddr().s6_addr, addr2.toAddr().s6_addr, 16) == 0)
    && addr1.getScopeId() == addr2.getScopeId();
}
// Return true if addr1 < addr2
inline bool operator<(const IPAddressV6& addr1, const IPAddressV6& addr2) {
  auto cmp = std::memcmp(addr1.toAddr().s6_addr,
                         addr2.toAddr().s6_addr, 16) < 0;
  if (!cmp) {
    return addr1.getScopeId() < addr2.getScopeId();
  } else {
    return cmp;
  }
}
// Derived operators
inline bool operator!=(const IPAddressV6& a, const IPAddressV6& b) {
  return !(a == b);
}
inline bool operator>(const IPAddressV6& a, const IPAddressV6& b) {
  return b < a;
}
inline bool operator<=(const IPAddressV6& a, const IPAddressV6& b) {
  return !(a > b);
}
inline bool operator>=(const IPAddressV6& a, const IPAddressV6& b) {
  return !(a < b);
}

}  // folly

namespace std {
template<>
struct hash<folly::IPAddressV6> {
  size_t operator()(const folly::IPAddressV6& addr) const {
    return addr.hash();
  }
};
}  // std
