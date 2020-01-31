import fetch from 'node-fetch';

const api = 'https://ncov-rss.qgis.me/api/messages?';

export default ({ limit, max_id }) =>
    fetch(`${api}limit=${limit}${max_id > 0 ? '&max_id=' + max_id : ''}`).then(
        res => {
            return res.json();
        }
    );
