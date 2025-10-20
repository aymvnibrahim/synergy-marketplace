export let orderToTrack = JSON.parse(sessionStorage.getItem('orderToTrack'));

if(!orderToTrack){
    orderToTrack = [];
}

export function trackMyOrder(productId, quantity, productName, productImg, deliveryDate){
    orderToTrack = [];
    orderToTrack = [{
        productName,
        productImg,
        quantity,
        productId,
        deliveryDate
    }]
    console.log(orderToTrack)

    sessionStorage.setItem('orderToTrack', JSON.stringify(orderToTrack))
}

export function clearTracking(){
    orderToTrack = [];
    sessionStorage.setItem('orderToTrack', JSON.stringify(orderToTrack))
}
