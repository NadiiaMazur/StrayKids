document.addEventListener('DOMContentLoaded', function () {
    var activeCat = "";

    function filterCategory(category) {
        if (activeCat !== category) {
            var items = document.querySelectorAll('.item');
            items.forEach(function (item) {
                item.style.display = 'none';
            });

            var selectedItems = document.querySelectorAll('[data-category="' + category + '"]');
            selectedItems.forEach(function (selectedItem) {
                selectedItem.style.display = 'flex';
            });

            activeCat = category;
        }
    }

    document.querySelector('.cat-all').addEventListener('click', function () {
        var items = document.querySelectorAll('.item');
        items.forEach(function (item) {
            item.style.display = 'flex';
        });

        activeCat = "all";
    });

    document.querySelector('.cat-1').addEventListener('click', function () { filterCategory("cat-1"); });
    document.querySelector('.cat-2').addEventListener('click', function () { filterCategory("cat-2"); });
    document.querySelector('.cat-3').addEventListener('click', function () { filterCategory("cat-3"); });
    document.querySelector('.cat-4').addEventListener('click', function () { filterCategory("cat-4"); });
    document.querySelector('.cat-5').addEventListener('click', function () { filterCategory("cat-5"); });
    document.querySelector('.cat-6').addEventListener('click', function () { filterCategory("cat-6"); });
    document.querySelector('.cat-7').addEventListener('click', function () { filterCategory("cat-7"); });
    document.querySelector('.cat-8').addEventListener('click', function () { filterCategory("cat-8"); });
});