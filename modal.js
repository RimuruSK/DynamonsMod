var isSubscribed = localStorage.getItem('subscribed');

if (!isSubscribed) {
    openSubscribeModal();
}

function openSubscribeModal() {
    var subscribeModal = document.getElementById("subscribeModal");
    subscribeModal.style.display = "flex";
}

function subscribe() {
    localStorage.setItem('subscribed', 'true');
    
    var subscribeModal = document.getElementById("subscribeModal");
    subscribeModal.style.display = "none";
}

document.getElementById("subscribeButton").addEventListener("click", subscribe);
