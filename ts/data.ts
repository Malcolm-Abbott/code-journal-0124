/* exported data */

interface Data {
  view: 'entries' | 'entry-form';
  entries: Values[];
  editing: null | Values;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', (): void => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-storage', dataJSON);
});

const previousDataJSON = localStorage.getItem('code-journal-storage');

if (previousDataJSON) data = JSON.parse(previousDataJSON);
