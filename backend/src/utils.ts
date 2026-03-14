export function random( len: number) {
    let option = "asbhsdfsfkj98nxjy709e8r887"
    let length = option.length;

    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += option.charAt(Math.floor(Math.random() * length));
    }
    return ans;
}