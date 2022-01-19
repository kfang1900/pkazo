

const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    let num, unit;
    if(diff < 60){
        num = diff;
        unit = 'second';
    }else if(diff < 3600){
        num = Math.floor(diff/60);
        unit = 'minute';
    }else if(diff < 86400){
        num = Math.floor(diff/3600);
        unit = 'hour';
    }else if(diff < 604800){
        num = Math.floor(diff/86400);
        unit = 'day';
    }else if(diff < 2592000){
        num = Math.floor(diff/604800);
        unit = 'week';
    }else if(diff < 31536000){
        num = Math.floor(diff/2592000);
        unit = 'month';
    }else{
        num = Math.floor(diff/31536000);
        unit = 'year';
    }
    return num + ' ' + unit + (num===1?'':'s') + ' ago';
}

const formatCount = (num: number) => {
    if(!num){
        return '';
    }else if(num < 1000){
        return num;
    }else if(num < 10000){
        return Math.floor(num/1000) + '.' + Math.floor(num%1000/100) + 'K';
    }else if(num < 1000000){
        return Math.floor(num/1000) + 'K';
    }else if(num < 10000000){
        return Math.floor(num/1000000) + '.' + Math.floor(num%1000000/100000) + 'M';
    }else{
        return Math.floor(num/1000000) + 'M';
    }
}

const formatCurrency = (num: number) => {
    let temp = num.toFixed(2);
    if(temp.endsWith('.00')){
        temp = temp.slice(0, -3);
    }
    return '$' + temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export { formatTime, formatCount, formatCurrency }
