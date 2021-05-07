import { _decorator, Component, sys } from 'cc';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('interstitial')
export class Interstitial extends Component {
    @property({ type: Console })
    console: Console = null!;

    interstitial: topon.Interstitial | undefined = undefined;

    getPlacementID() {
        if (sys.platform === sys.IPHONE || sys.platform === sys.IPAD) {
            return 'b5bacad80a0fb1';
        } else if (sys.ANDROID === sys.platform) {
            return 'b5baca585a8fef';
        }
    }

    start() {
        let placementID = this.getPlacementID();
        if (!placementID) {
            this.console.log(
                'Interstitial',
                'TopOn ad only support Android or iOS.'
            );
            return;
        }
        let _console = this.console;
        this.interstitial = topon.toponService.getInterstitial(placementID, {
            onInterstitialAdLoaded(): void {
                _console.log('InterstitialListener', 'onInterstitialAdLoaded');
            },
            onInterstitialAdLoadFail(errorInfo: any): void {
                _console.log(
                    'InterstitialListener',
                    'onInterstitialAdLoadFail'
                );
            },
            onInterstitialAdClicked(adInfo: topon.AdInfo): void {
                _console.log('InterstitialListener', 'onInterstitialAdClicked');
            },
            onInterstitialAdShow(adInfo: topon.AdInfo): void {
                _console.log('InterstitialListener', 'onInterstitialAdShow');
            },
            onInterstitialAdClose(adInfo: topon.AdInfo): void {
                _console.log('InterstitialListener', 'onInterstitialAdClose');
            },
            onInterstitialAdVideoStart(adInfo: topon.AdInfo): void {
                _console.log(
                    'InterstitialListener',
                    'onInterstitialAdVideoStart'
                );
            },
            onInterstitialAdVideoEnd(adInfo: topon.AdInfo): void {
                _console.log(
                    'InterstitialListener',
                    'onInterstitialAdVideoEnd'
                );
            },
            onInterstitialAdVideoError(errorInfo: any): void {
                _console.log(
                    'InterstitialListener',
                    'onInterstitialAdVideoError'
                );
            },
        });
        this.interstitial.loadInterstitial({
            UseRewardedVideoAsInterstitial: true,
        });
    }

    isAdReady() {
        this.console.log(
            'Interstitial',
            `isAdReady => ${this.interstitial?.isAdReady() || false}`
        );
    }

    checkAdStatus() {
        this.console.log(
            'Interstitial',
            `isAdReady => ${JSON.stringify(this.interstitial?.checkAdStatus())}`
        );
    }

    show() {
        this.interstitial?.showAd();
    }
}
