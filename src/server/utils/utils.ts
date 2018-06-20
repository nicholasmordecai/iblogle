export default class Utils {
    public static capitalize(string): string {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    public static stripSlugAndCapitalize(string: string): string {
        let arr = string.split('-');
        for(let i = 0, len = arr.length; i < len; i++) {
            arr[i] = Utils.capitalize(arr[i]);
        }
        let newString = arr.join(' ');
        return newString;
    }
}