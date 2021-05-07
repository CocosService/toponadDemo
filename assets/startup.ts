import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('Startup')
export class Startup extends Component {
    start() {
        // 启用日志
        topon.toponService.setLogDebug(true);
        // 检查第三方广告的集成情况
        topon.toponService.integrationChecking();
    }
    intoBanner() {
        director.loadScene('banner');
    }
    intoInterstitial() {
        director.loadScene('interstitial');
    }
    intoNative() {
        director.loadScene('native');
    }
    intoRewardVideo() {
        director.loadScene('rewardvideo');
    }
}
