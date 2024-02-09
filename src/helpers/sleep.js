export default {

    function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function sleep() {
    const ms = this.randomInteger(10000, 15000);
    return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
