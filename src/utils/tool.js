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
    entities.reverse();
    entities.forEach(({ _, offset, length, url }) => {
        const reg = new RegExp(
            `([\\s\\S]{${offset}})([\\s\\S]{${length}})([\\s\\S]*)`
        );
        let replacement = '$&';
        if (_ === 'MessageEntityTextUrl') {
            replacement = `$1<a href='${url}' target='_blanket'>$2</a>$3`;
        } else if (_ === 'MessageEntityHashtag') {
            replacement = `$1<span class='tag'>$2</span>$3`;
        } else if (_ === 'MessageEntityBold') {
            // replacement = `$1<span class='bold'>$2</span>$3`;
        }

        text = text.replace(reg, replacement);
    });
    return text;
};
