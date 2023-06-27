//
//  DFPRequest.h
//  Google Mobile Ads SDK
//
//  Copyright 2014 Google Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <GoogleMobileAds/GADRequest.h>
#import <GoogleMobileAds/GoogleMobileAdsDefines.h>

NS_ASSUME_NONNULL_BEGIN

/// Add this constant to the testDevices property's array to receive test ads on the simulator.
GAD_EXTERN const id kDFPSimulatorID;

/// Specifies optional parameters for ad requests.
GAD_SUBCLASSING_RESTRICTED
@interface DFPRequest : GADRequest

/// Publisher provided user ID.
@property(nonatomic, copy, nullable) NSString *publisherProvidedID;

/// Array of strings used to exclude specified categories in ad results.
@property(nonatomic, copy, nullable) NSArray *categoryExclusions;

/// Key-value pairs used for custom targeting.
@property(nonatomic, copy, nullable) NSDictionary *customTargeting;

/// This API is deprecated and a no-op, use an instance of GADCorrelator set on DFPInterstitial or
/// DFPBannerView objects to correlate requests.
+ (void)updateCorrelator GAD_DEPRECATED_MSG_ATTRIBUTE(
    "Set GADCorrelator objects on your ads instead. This method no longer affects ad correlation.");

@end

NS_ASSUME_NONNULL_END
