function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const container = document.querySelector('.container');
    const tab = document.getElementById('toggle-tab');

    sidebar.classList.toggle('hidden');
    container.classList.toggle('fullwidth');
    tab.classList.toggle('closed');
    tab.innerText = tab.classList.contains('closed') ? '❯ Info' : '❮ Info';
}
