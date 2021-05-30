global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
};

window.URL.createObjectURL = () => {}

jest.mock('@fe-arm/fe-package-djvujs', () => ({
    DjVu: {
        Worker: function(){}
    }
}))
