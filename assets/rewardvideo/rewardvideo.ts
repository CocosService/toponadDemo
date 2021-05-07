import { _decorator, Component, sys } from 'cc';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('rewardvideo')
export class RewardVideo extends Component {
    @property({ type: Console })
    console: Console = null!;

    rewardvideo: topon.RewardVideo | undefined = undefined;

    getPlacementID() {
        if (sys.platform === sys.IPHONE || sys.platform === sys.IPAD) {
            return 'b5b72b21184aa8';
        } else if (sys.ANDROID === sys.platform) {
            return 'b5b728e7a08cd4';
        }
    }

    start() {
        let placementID = this.getPlacementID();
        if (!placementID) {
            this.console.log('Native', 'TopOn ad only support Android or iOS.');
            return;
        }
        let _console = this.console;
        this.rewardvideo = topon.toponService.getRewardVideo(placementID, {
            onRewardedVideoAdLoaded() {
                _console.log('RewardVideoListener', 'onRewardedVideoAdLoaded');
            },
            onRewardedVideoAdFailed(errorInfo: any) {
                _console.log('RewardVideoListener', 'onRewardedVideoAdFailed');
            },
            onRewardedVideoAdPlayStart(adInfo: topon.AdInfo) {
                _console.log(
                    'RewardVideoListener',
                    'onRewardedVideoAdPlayStart'
                );
            },
            onRewardedVideoAdPlayEnd(adInfo: topon.AdInfo) {
                _console.log('RewardVideoListener', 'onRewardedVideoAdPlayEnd');
            },
            onRewardedVideoAdPlayFailed(errorInfo: any, adInfo: topon.AdInfo) {
                _console.log(
                    'RewardVideoListener',
                    'onRewardedVideoAdPlayFailed'
                );
            },
            onRewardedVideoAdClosed(adInfo: topon.AdInfo) {
                _console.log('RewardVideoListener', 'onRewardedVideoAdClosed');
            },
            onRewardedVideoAdPlayClicked(adInfo: topon.AdInfo) {
                _console.log(
                    'RewardVideoListener',
                    'onRewardedVideoAdPlayClicked'
                );
            },
            onReward(adInfo: topon.AdInfo) {
                _console.log('RewardVideoListener', 'onReward');
            },
        });
        this.rewardvideo.loadRewardVideo({
            userID: 'test_user_id',
            media_ext: 'test_user_data',
        });
    }

    isAdReady() {
        this.console.log(
            'RewardVideo',
            `isAdReady => ${this.rewardvideo?.isAdReady() || false}`
        );
    }

    checkAdStatus() {
        this.console.log(
            'RewardVideo',
            `isAdReady => ${JSON.stringify(this.rewardvideo?.checkAdStatus())}`
        );
    }

    show() {
        this.rewardvideo?.showAd();
    }
}
