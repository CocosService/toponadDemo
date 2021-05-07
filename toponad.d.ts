declare namespace topon {
    interface ParamMap {
        os_vn?: string;
        os_vc?: string;
        package_name?: string;
        app_vn?: string;
        app_vc?: string;
        brand?: string;
        model?: string;
        screen?: string;
        mnc?: string;
        mcc?: string;
        language?: string;
        timezone?: string;
        ua?: string;
        orient?: string;
        network_type?: string;
        it_src?: string;
        android_id?: string;
        gaid?: string;
        mac?: string;
        imei?: string;
        oaid?: string;
        idfa?: string;
        idfv?: string;
        [name: string]: any;
    }
    type UserLocationCallback = (status: 0 | 1 | 2) => void;
    enum GDPRLevel {
        PERSONALIZED = 0,
        NONPERSONALIZED = 1,
        UNKNOWN = 2
    }
    interface AdInfo {
        /**
         * 每次展示广告时生成的独立ID
         */
        id: number;
        /**
         * 展示收益，单位可通过 currency 获取， 精度可通过 precision 获取
         */
        publisher_revenue: number;
        /**
         * 货币单位，例如："USD"
         */
        currency: string;
        /**
         * 国家代码， 例如：”CN"
         */
        country: string;
        /**
         * TopOn广告位ID
         */
        adunit_id: string;
        /**
         * 广告类型，包括："Native"、"RewardedVideo"、"Banner"、"Interstitial"、"Splash"
         */
        adunit_format: "Native" | "RewardedVideo" | "Banner" | "Interstitial" | "Splash";
        /**
         * ECPM精度
         * "publisher_defined"：开发者在TopOn后台为广告源定义的eCPM（交叉推广的eCPM也属于该类型)
         * "estimated": 在TopOn后台开启广告源的自动价格功能后，TopOn根据历史数据计算出的eCPM
         * "exact"：实时竞价的eCPM
         */
        precision: "publisher_defined" | "estimated" | "exact";
        /**
         * Network类型
         * "Network"：第三方广告平台
         * "Cross_Promotion"：交互推广
         * "Adx"：TopOn Adx
         */
        network_type: "Network" | "Cross_Promotion" | "Adx";
        /**
         * 广告平台的广告位ID
         */
        network_placement_id: string;
        /**
         * 广告源的eCPM层级(对应开发者后台聚合管理页面的优先级），头部竞价广告源默认为0
         */
        ecpm_level: number;
        /**
         * 流量分组ID
         */
        segment_id: number;
        /**
         * 广告场景ID，仅Rewarded Video&Interstitial支持
         */
        scenario_id: string;
        /**
         * 广告场景的激励名称，仅Rewarded Video支持
         */
        scenario_reward_name: string;
        /**
         * 广告场景的激励数量，仅Rewarded Video支持
         */
        scenario_reward_number: number;
        /**
         * 渠道信息
         */
        channel: string;
        /**
         * Placement+App维度的自定义规则的Json字符串
         */
        sub_channel: string;
        /**
         * Placement+App维度的自定义规则
         */
        custom_rule: {
            [name: string]: any;
        };
        /**
         * 广告平台对应的ID，用于区分广告平台，参考文档末尾的
         */
        network_firm_id: number;
        /**
         * 广告源ID. 可在开发者后台或TopOn Open API 通过广告源ID查询具体的Network信息
         */
        adsource_id: string;
        /**
         * 当前广告源在WaterFall中的排序（从0开始，0优先级最高）
         */
        adsource_index: number;
        /**
         * eCPM，currency 获取, 精度可通过 precision 获取
         */
        adsource_price: number;
        /**
         * 是否为头部竞价的广告源，1：是，2：否
         */
        adsource_isheaderbidding: 1 | 2;
        /**
         * 广告的自定义信息，针对Adx、OnlineAPI以及自定义广告平台，Adx、OnlineAPI相关Key参考
         */
        ext_info: {
            /**
             * Adx & OnlineAPI Offer的广告 ID
             */
            offer_id: string;
            /**
             * Adx & OnlineAPI Offer的素材 ID
             */
            creative_id: string;
            /**
             * 判断Adx & OnlineAPI Offer的单子类型是否为Deeplink或JumpURL的单子 0: 否、1: 是
             */
            is_deeplink: 0 | 1;
            network_id: string;
            network_unit_id: string;
            network_ecpm: string;
            [name: string]: any;
        };
        reward_custom_data: {
            [name: string]: any;
        };
    }
    interface AdStatus {
        isLoading: boolean;
        isReady: boolean;
        adInfo: AdInfo;
    }
    interface BannerListener {
        onBannerAdLoaded?: () => void;
        onBannerAdFailed?: (errorInfo: any) => void;
        onBannerAdClicked?: (adInfo: AdInfo) => void;
        onBannerAdShow?: (adInfo: AdInfo) => void;
        onBannerAdClose?: (adInfo: AdInfo) => void;
        onBannerAdAutoRefreshed?: (adInfo: AdInfo) => void;
        onBannerAdAutoRefreshFail?: (errorInfo: any) => void;
        onBannerAdCloseButtonTapped?: (adInfo: AdInfo) => void;
        onDeeplinkCallback?: (adInfo: AdInfo, isSuccess: boolean) => void;
    }
    interface InterstitialListener {
        onInterstitialAdLoaded?: () => void;
        onInterstitialAdLoadFail?: (errorInfo: any) => void;
        onInterstitialAdClicked?: (adInfo: AdInfo) => void;
        onInterstitialAdShow?: (adInfo: AdInfo) => void;
        onInterstitialAdClose?: (adInfo: AdInfo) => void;
        onInterstitialAdVideoStart?: (adInfo: AdInfo) => void;
        onInterstitialAdVideoEnd?: (adInfo: AdInfo) => void;
        onInterstitialAdVideoError?: (errorInfo: any) => void;
        onInterstitialAdFailedToShow?: (errorInfo: any, adInfo: AdInfo) => void;
        onDeeplinkCallback?: (adInfo: AdInfo, isSuccess: boolean) => void;
    }
    interface NativeListener {
        onNativeAdLoaded?: () => void;
        onNativeAdLoadFail?: (errorInfo: any) => void;
        onNativeAdShow?: (adInfo: AdInfo) => void;
        onNativeAdClick?: (adInfo: AdInfo) => void;
        onNativeAdVideoStart?: () => void;
        onNativeAdVideoEnd?: () => void;
        onNativeAdVideoProgress?: (progress: number) => void;
        onNativeAdCloseButtonClick?: (adInfo: AdInfo) => void;
        onDeeplinkCallback?: (adInfo: AdInfo, isSuccess: boolean) => void;
    }
    interface RewardVideoListener {
        onRewardedVideoAdLoaded?: () => void;
        onRewardedVideoAdFailed?: (errorInfo: any) => void;
        onRewardedVideoAdPlayStart?: (adInfo: AdInfo) => void;
        onRewardedVideoAdPlayEnd?: (adInfo: AdInfo) => void;
        onRewardedVideoAdPlayFailed?: (errorInfo: any, adInfo: AdInfo) => void;
        onRewardedVideoAdClosed?: (adInfo: AdInfo) => void;
        onRewardedVideoAdPlayClicked?: (adInfo: AdInfo) => void;
        onReward?: (adInfo: AdInfo) => void;
        onDeeplinkCallback?: (adInfo: AdInfo, isSuccess: boolean) => void;
    }
    class NativeViewItem {
        x: number;
        y: number;
        width: number;
        height: number;
        backgroundColor: string;
        textColor: string;
        textSize: number;
        constructor(x: number, y: number, width: number, height: number, backgroundColor: string, textColor: string, textSize: number);
    }
    class NativeViewProperty {
        parent: NativeViewItem | undefined;
        appIcon: NativeViewItem | undefined;
        mainImage: NativeViewItem | undefined;
        title: NativeViewItem | undefined;
        desc: NativeViewItem | undefined;
        adLogo: NativeViewItem | undefined;
        cta: NativeViewItem | undefined;
        rating: NativeViewItem | undefined;
    }
    namespace JSB {
        function fullClassName(sampleClassName: string): string;
        function callNativeMethod(className: string, methodName: string, ...parameters: any): any;
        function isAndroid(): boolean;
        function isIOS(): boolean;
    }
    namespace Base {
        interface Base {
            getPlacementId(): string;
        }
        interface Banner extends Base {
            loadBanner(settings: string): void;
            isAdReady(): boolean;
            showAdInPosition(position: string): void;
            showAdInRectangle(rect: string): void;
            removeAd(): void;
            reshowAd(): void;
            hideAd(): void;
        }
        interface RewardVideo extends Base {
            loadRewardVideo(settings: string): void;
            showAd(scenario?: string): void;
            isAdReady(): boolean;
            checkAdStatus(): string;
        }
        interface Interstitial extends Base {
            loadInterstitial(settings: string): void;
            showAd(scenario?: string): void;
            isAdReady(): boolean;
            checkAdStatus(): string;
        }
        interface Native extends Base {
            loadNative(settings: string): void;
            isAdReady(): boolean;
            showAd(adViewProperty: string): void;
            removeAd(): void;
            clean(): void;
        }
        interface TopOnAd {
            initCustomMap(customMap: string): void;
            setPlacementCustomMap(placmentId: string, customMap: string): void;
            setGDPRLevel(level: number): void;
            getGDPRLevel(): number;
            getUserLocation(): void;
            showGDPRAuth(): void;
            setLogDebug(debug: boolean): void;
            deniedUploadDeviceInfo(deniedInfo: string): void;
            integrationChecking(): void;
        }
    }
    namespace Android {
        class Banner implements Base.Banner {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadBanner(settings: string): void;
            isAdReady(): boolean;
            showAdInPosition(position: string): void;
            showAdInRectangle(rect: string): void;
            removeAd(): void;
            reshowAd(): void;
            hideAd(): void;
        }
        class Interstitial implements Base.Interstitial {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadInterstitial(settings: string): void;
            showAd(scenario?: string): void;
            isAdReady(): boolean;
            checkAdStatus(): string;
        }
        class Native implements Base.Native {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadNative(settings: string): void;
            isAdReady(): boolean;
            showAd(adViewProperty: string): void;
            removeAd(): void;
            clean(): void;
        }
        class RewardVideo implements Base.RewardVideo {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadRewardVideo(settings: string): void;
            showAd(scenario?: string): void;
            isAdReady(): boolean;
            checkAdStatus(): string;
        }
        class TopOnAd implements Base.TopOnAd {
            className: string;
            constructor();
            initCustomMap(customMap: string): void;
            setPlacementCustomMap(placmentId: string, customMap: string): void;
            setGDPRLevel(level: number): void;
            getGDPRLevel(): number;
            getUserLocation(): void;
            showGDPRAuth(): void;
            setLogDebug(debug: boolean): void;
            deniedUploadDeviceInfo(deniedInfo: string): void;
            integrationChecking(): void;
        }
    }
    namespace iOS {
        class Banner implements Base.Banner {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadBanner(settings: string): void;
            isAdReady(): boolean;
            showAdInPosition(position: string): void;
            showAdInRectangle(rect: string): void;
            removeAd(): void;
            reshowAd(): void;
            hideAd(): void;
        }
        class Interstitial implements Base.Interstitial {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadInterstitial(settings: string): void;
            showAd(scenario?: string): void;
            isAdReady(): boolean;
            checkAdStatus(): string;
        }
        class Native implements Base.Native {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadNative(settings: string): void;
            isAdReady(): boolean;
            showAd(adViewProperty: string): void;
            removeAd(): void;
            clean(): void;
        }
        class RewardVideo implements Base.RewardVideo {
            placementId: string;
            className: string;
            constructor(placementId: string);
            getPlacementId(): string;
            loadRewardVideo(settings: string): void;
            showAd(scenario?: string): void;
            isAdReady(): boolean;
            checkAdStatus(): string;
        }
        class TopOnAd implements Base.TopOnAd {
            className: string;
            constructor();
            initCustomMap(customMap: string): void;
            setPlacementCustomMap(placmentId: string, customMap: string): void;
            setGDPRLevel(level: number): void;
            getGDPRLevel(): number;
            getUserLocation(): void;
            showGDPRAuth(): void;
            setLogDebug(debug: boolean): void;
            deniedUploadDeviceInfo(deniedInfo: string): void;
            integrationChecking(): void;
        }
    }
    namespace Listener {
        function parseCallbackInfo(callbackInfo: string): AdInfo;
        const TopOn: {
            userLocationCallback: UserLocationCallback;
            setCallback(cb: UserLocationCallback): void;
            onUserLocation(status: 0 | 1 | 2): void;
        };
        const Banner: {
            listenerMap: Map<string, BannerListener>;
            setListener(placementId: string, listener: BannerListener): void;
            onBannerAdLoaded(placementId: string): void;
            onBannerAdFailed(placementId: string, errorInfo: string): void;
            onBannerAdClicked(placementId: string, callbackInfo: string): void;
            onBannerAdShow(placementId: string, callbackInfo: string): void;
            onBannerAdClose(placementId: string, callbackInfo: string): void;
            onBannerAdAutoRefreshed(placementId: string, callbackInfo: string): void;
            onBannerAdAutoRefreshFail(placementId: string, errorInfo: string): void;
            onBannerAdCloseButtonTapped(placementId: string, callbackInfo: string): void;
            onDeeplinkCallback(placementId: string, callbackInfo: string, isSuccess: string): void;
        };
        const Interstitial: {
            listenerMap: Map<string, InterstitialListener>;
            setListener(placementId: string, listener: InterstitialListener): void;
            onInterstitialAdLoaded(placementId: string): void;
            onInterstitialAdLoadFail(placementId: string, errorInfo: string): void;
            onInterstitialAdClicked(placementId: string, callbackInfo: string): void;
            onInterstitialAdShow(placementId: string, callbackInfo: string): void;
            onInterstitialAdClose(placementId: string, callbackInfo: string): void;
            onInterstitialAdVideoStart(placementId: string, callbackInfo: string): void;
            onInterstitialAdVideoEnd(placementId: string, callbackInfo: string): void;
            onInterstitialAdVideoError(placementId: string, errorInfo: string): void;
            onInterstitialAdFailedToShow(placementId: string, errorInfo: string, callbackInfo: string): void;
            onDeeplinkCallback(placementId: string, callbackInfo: string, isSuccess: string): void;
        };
        const Native: {
            listenerMap: Map<string, NativeListener>;
            setListener(placementId: string, listener: NativeListener): void;
            onNativeAdLoaded(placementId: string): void;
            onNativeAdLoadFail(placementId: string, errorInfo: string): void;
            onNativeAdShow(placementId: string, callbackInfo: string): void;
            onNativeAdClick(placementId: string, callbackInfo: string): void;
            onNativeAdVideoStart(placementId: string): void;
            onNativeAdVideoEnd(placementId: string): void;
            onNativeAdVideoProgress(placementId: string, progress: string): void;
            onNativeAdCloseButtonClick(placementId: string, callbackInfo: string): void;
            onDeeplinkCallback(placementId: string, callbackInfo: string, isSuccess: string): void;
        };
        const RewardVideo: {
            listenerMap: Map<string, RewardVideoListener>;
            setListener(placementId: string, listener: RewardVideoListener): void;
            onRewardedVideoAdLoaded(placementId: string): void;
            onRewardedVideoAdFailed(placementId: string, errorInfo: string): void;
            onRewardedVideoAdPlayStart(placementId: string, callbackInfo: string): void;
            onRewardedVideoAdPlayEnd(placementId: string, callbackInfo: string): void;
            onRewardedVideoAdPlayFailed(placementId: string, errorInfo: string, callbackInfo: string): void;
            onRewardedVideoAdClosed(placementId: string, callbackInfo: string): void;
            onRewardedVideoAdPlayClicked(placementId: string, callbackInfo: string): void;
            onReward(placementId: string, callbackInfo: string): void;
            onDeeplinkCallback(placementId: string, callbackInfo: string, isSuccess: string): void;
        };
    }
    class Banner {
        banner: Base.Banner | undefined;
        constructor(placementId: string);
        loadBanner(settings?: {
            banner_ad_size_struct?: {
                width: number;
                height: number;
            };
            width?: number;
            height?: number;
            adaptive_width?: number;
            adaptive_orientation?: 0 | 1 | 2;
            inline_adaptive_width?: number;
            inline_adaptive_orientation?: 0 | 1 | 2;
        }): void;
        isAdReady(): boolean;
        showAdInPosition(position: 'top' | 'bottom'): void;
        showAdInRectangle(rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        }): void;
        removeAd(): void;
        reshowAd(): void;
        hideAd(): void;
        setAdListener(listener: BannerListener): void;
    }
    class Interstitial {
        interstitial: Base.Interstitial | undefined;
        constructor(placementId: string);
        loadInterstitial(settings?: {
            UseRewardedVideoAsInterstitial: boolean;
        }): void;
        showAd(scenario?: string): void;
        isAdReady(): boolean;
        checkAdStatus(): AdStatus | undefined;
        setAdListener(listener: InterstitialListener): void;
    }
    class Native {
        native: Base.Native | undefined;
        constructor(placementId: string);
        loadNative(settings?: {
            width: number;
            height: number;
        }): void;
        isAdReady(): boolean;
        showAd(adViewProperty: NativeViewProperty): void;
        removeAd(): void;
        clean(): void;
        setAdListener(listener: NativeListener): void;
    }
    class RewardVideo {
        rewardVideo: Base.RewardVideo | undefined;
        constructor(placementId: string);
        loadRewardVideo(settings?: {
            userID: string;
            media_ext: string;
        }): void;
        showAd(scenario?: string): void;
        isAdReady(): boolean;
        checkAdStatus(): AdStatus | undefined;
        setAdListener(listener: RewardVideoListener): void;
    }
    class TopOnAd {
        toponAd: Base.TopOnAd | undefined;
        constructor();
        initCustomMap(customMap: ParamMap): void;
        setPlacementCustomMap(placmentId: string, customMap: ParamMap): void;
        setGDPRLevel(level: GDPRLevel): void;
        getGDPRLevel(): GDPRLevel;
        getUserLocation(callback: UserLocationCallback): void;
        showGDPRAuth(): void;
        setLogDebug(debug: boolean): void;
        deniedUploadDeviceInfo(deniedInfo: string): void;
        integrationChecking(): void;
        getBanner(placementId: string, listener?: BannerListener): Banner;
        getInterstitial(placementId: string, listener?: InterstitialListener): Interstitial;
        getNative(placementId: string, listener?: NativeListener): Native;
        getRewardVideo(placementId: string, listener?: RewardVideoListener): RewardVideo;
    }
    const toponService: TopOnAd;
}
