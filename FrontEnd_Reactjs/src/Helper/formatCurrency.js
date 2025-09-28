

export const FormatCurrency = (price) =>{
    if(price >= 1000){
        return (price/1000) + "K"
    }
    return price.toString();
}

