export function renderListItem(itemObject) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = `${itemObject.item}: ${itemObject.quantity}/10`;
    return listItemEl;
}
