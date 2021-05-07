import { _decorator, Component, sys, view } from 'cc';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('banner')
export class Banner extends Component {
    @property({ type: Console })
    console: Console = null!;

    banner: topon.Banner | undefined = undefined;

    getPlacementID() {
        if (sys.platform === sys.IPHONE || sys.platform === sys.IPAD) {
            return 'b5bacacfc470c9';
        } else if (sys.ANDROID === sys.platform) {
            return 'b5baca45138428';
        }
    }

    start() {
        let placementID = this.getPlacementID();
        if (!placementID) {
            this.console.log('Banner', 'TopOn ad only support Android or iOS.');
            return;
        }
        let _console = this.console;
        this.banner = topon.toponService.getBanner(placementID, {
            onBannerAdLoaded(): void {
                _console.log('BannerListener', 'onBannerAdLoaded');
            },
            onBannerAdFailed(errorInfo: any): void {
                _console.log('BannerListener', 'onBannerAdFailed');
            },
            onBannerAdClicked(adInfo: topon.AdInfo): void {
                _console.log('BannerListener', 'onBannerAdClicked');
            },
            onBannerAdShow(adInfo: topon.AdInfo): void {
                _console.log('BannerListener', 'onBannerAdShow');
            },
            onBannerAdClose(adInfo: topon.AdInfo): void {
                _console.log('BannerListener', 'onBannerAdClose');
            },
            onBannerAdAutoRefreshed(adInfo: topon.AdInfo): void {
                _console.log('BannerListener', 'onBannerAdAutoRefreshed');
            },
            onBannerAdAutoRefreshFail(errorInfo: any): void {
                _console.log('BannerListener', 'onBannerAdAutoRefreshFail');
            },
        });
        this.banner.loadBanner({
            banner_ad_size_struct: {
                width: view.getFrameSize().width,
                height: 150,
            },
            adaptive_width: view.getFrameSize().width,
            adaptive_orientation: 1,
        });
    }

    isAdReady() {
        this.console.log(
            'Banner',
            `isAdReady => ${this.banner?.isAdReady() || false}`
        );
    }

    show() {
        this.banner?.showAdInPosition('bottom');
    }

    hide() {
        this.banner?.hideAd();
    }

    reshow() {
        this.banner?.reshowAd();
    }

    remove() {
        this.banner?.removeAd();
    }
}
