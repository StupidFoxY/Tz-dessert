export class Utils {
    public static currencyFormat(price:number) {
        return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(price)
    }
}