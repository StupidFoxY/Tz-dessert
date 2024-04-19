import { GlobalStore } from '@/stores/global-store';
export class AxiosLoading {
    loadingCount: number;
    loading:boolean; 
    globalStore:any;
    constructor() {
        this.loadingCount = 0;
        this.loading = false;
    }
    initLoading(){
        this.loading = true;
        // 触发loading的动画插件
        this.globalStore = GlobalStore();
        this.globalStore.spinning = true;
    }

    addLoading(){
        if (this.loadingCount === 0) {
            this.initLoading();
        }
        this.loadingCount++;
    }

    closeLoading(){
        if (this.loadingCount > 0) {
            if (this.loadingCount === 1) {
                this.loading = false;
                // 关闭loading的动画插件
                this.globalStore.spinning = false;
            }
            this.loadingCount--;
        }
    }
}