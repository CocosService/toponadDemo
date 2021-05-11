import { _decorator, Component, sys, view } from 'cc';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('native')
export class Native extends Component {
    @property({ type: Console })
    console: Console = null!;

    native: topon.Native | undefined = undefined;

    getPlacementID() {
        if (sys.platform === sys.IPHONE || sys.platform === sys.IPAD) {
            return 'b5c2c6d50e7f44';
        } else if (sys.ANDROID === sys.platform) {
            return 'b5c2c97629da0d';
        }
    }

    start() {
        let placementID = this.getPlacementID();
        if (!placementID) {
            this.console.log('Native', 'TopOn ad only support Android or iOS.');
            return;
        }
        let _console = this.console;
        this.native = topon.toponService.getNative(placementID, {
            onNativeAdLoaded() {
                _console.log('NativeListener', 'onNativeAdLoaded');
            },
            onNativeAdLoadFail(errorInfo: any) {
                _console.log('NativeListener', 'onNativeAdLoadFail');
            },
            onNativeAdShow(adInfo: topon.AdInfo) {
                _console.log('NativeListener', 'onNativeAdShow');
            },
            onNativeAdClick(adInfo: topon.AdInfo) {
                _console.log('NativeListener', 'onNativeAdClick');
            },
            onNativeAdVideoStart() {
                _console.log('NativeListener', 'onNativeAdVideoStart');
            },
            onNativeAdVideoEnd() {
                _console.log('NativeListener', 'onNativeAdVideoEnd');
            },
            onNativeAdCloseButtonClick(adInfo: topon.AdInfo) {
                _console.log('NativeListener', 'onNativeAdCloseButtonClick');
            },
        });
        this.native.loadNative({
            width: view.getFrameSize().width,
            height: (view.getFrameSize().width * 4) / 5,
        });
    }

    isAdReady() {
        this.console.log(
            'Native',
            `isAdReady => ${this.native?.isAdReady() || false}`
        );
    }

    show() {
        var frameSize = view.getFrameSize();
        var frameWidth = frameSize.width;
        var frameHeight = frameSize.height;
        var padding = frameSize.width / 35;

        var parentWidth = frameWidth;
        var parentHeight = (frameWidth * 4) / 5;
        var appIconSize = frameWidth / 7;

        var nativeAdViewProperty = new topon.NativeViewProperty();
        nativeAdViewProperty.parent = new topon.NativeViewItem(
            0,
            frameHeight - parentHeight,
            parentWidth,
            parentHeight,
            '#ffffff',
            '',
            0
        );

        nativeAdViewProperty.appIcon = new topon.NativeViewItem(
            0,
            parentHeight - appIconSize,
            appIconSize,
            appIconSize,
            '',
            '',
            0
        );
        nativeAdViewProperty.cta = new topon.NativeViewItem(
            parentWidth - appIconSize * 2,
            parentHeight - appIconSize,
            appIconSize * 2,
            appIconSize,
            '#2095F1',
            '#ffffff',
            appIconSize / 3
        );

        nativeAdViewProperty.mainImage = new topon.NativeViewItem(
            padding,
            padding,
            parentWidth - 2 * padding,
            parentHeight - appIconSize - 2 * padding,
            '#ffffff',
            '#ffffff',
            14
        );

        nativeAdViewProperty.title = new topon.NativeViewItem(
            appIconSize + padding,
            parentHeight - appIconSize,
            parentWidth - 3 * appIconSize - 2 * padding,
            appIconSize / 2,
            '',
            '#000000',
            appIconSize / 3
        );
        nativeAdViewProperty.desc = new topon.NativeViewItem(
            appIconSize + padding,
            parentHeight - appIconSize / 2,
            parentWidth - 3 * appIconSize - 2 * padding,
            appIconSize / 2,
            '#ffffff',
            '#000000',
            appIconSize / 4
        );
        this.native?.showAd(nativeAdViewProperty);
    }

    remove() {
        this.native?.removeAd();
    }
}
