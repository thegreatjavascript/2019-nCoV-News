export const isMobile = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return !flag;
};

export const translateEntry = (text, entities) => {
    // if (_ === 'MessageEntityTextUrl') {
    // }
    const { offset, length, url } = entities[entities.length - 1];
    let newStr = '';
    for (let i in text) {
        i = Number(i);
        if (i === undefined) continue;

        if (i === offset) {
            newStr += '[';
        }

        newStr += text[i];

        if (i === offset + length - 1) {
            newStr += `](${url})`;
        }
    }
    // text = text.replace(
    // /\(([\s\S]*)\)$/,
    // '[$1](' + entities[entities.length - 1].url + ')'
    // );
    return newStr;
};
