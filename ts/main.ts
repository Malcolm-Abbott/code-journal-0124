/* global data */
const $photo = document.querySelector('#photo') as HTMLInputElement;
const $title = document.querySelector('#title') as HTMLInputElement;
const $notes = document.querySelector('#notes') as HTMLTextAreaElement;
const $imgNew = document.querySelector('.img-new') as HTMLImageElement;

if (!$title) throw new Error('The $title query failed');
if (!$notes) throw new Error('The $notes query failed');

$photo?.addEventListener('input', (): void => {
  $imgNew?.setAttribute('src', $photo.value);
});

const $form = document.querySelector('form') as HTMLFormElement;

interface Values {
  title: string;
  photo: string;
  notes: string;
  entryId?: number;
}

$form?.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const title = $title.value;
  const photo = $photo.value;
  const notes = $notes.value;

  const values: Values = {
    title,
    photo,
    notes,
  };

  values.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(values);
  $imgNew.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry: Values): HTMLLIElement {
  const $li = document.createElement('li') as HTMLLIElement;

  const $row = document.createElement('div') as HTMLDivElement;
  $row.className = 'row';
  $li.append($row);

  const $colHalf = document.createElement('div') as HTMLDivElement;
  $colHalf.className = 'column-half';
  $row.append($colHalf);

  const $imgEntriesWrapper = document.createElement('div') as HTMLDivElement;
  $imgEntriesWrapper.className = 'img-entries-wrapper';
  $colHalf.append($imgEntriesWrapper);

  const $img = document.createElement('img') as HTMLImageElement;
  $img.setAttribute('src', entry.photo);
  $imgEntriesWrapper.append($img);

  const $colHalf2 = document.createElement('div') as HTMLDivElement;
  $colHalf2.className = 'column-half';
  $row.append($colHalf2);

  const $h3 = document.createElement('h3') as HTMLHeadingElement;
  $h3.textContent = entry.title;
  $colHalf2.append($h3);

  const $p = document.createElement('p') as HTMLParagraphElement;
  $p.textContent = entry.notes;
  $colHalf2.append($p);

  return $li;
}

document.addEventListener('DOMContentLoaded', (): void => {
  const $ul = document.querySelector('ul') as HTMLUListElement;
  data.entries.forEach((entry) => {
    $ul.prepend(renderEntry(entry));
  });
});

function toggleNoEntries(): void {
  const $noEntries = document.querySelector(
    '.no-entries'
  ) as HTMLParagraphElement;
  $noEntries.classList.add('hidden');
}

toggleNoEntries();

function viewSwap(view: 'entries' | 'entry-form'): void {
  const $entryForm = document.querySelector(
    'div[data-view="entry-form"'
  ) as HTMLDivElement;
  const $entries = document.querySelector(
    'div[data-view="entries"]'
  ) as HTMLDivElement;

  if (view === $entryForm.dataset.view) {
    $entryForm.classList.remove('hidden');
    $entries.classList.add('hidden');
    data.view = 'entry-form';
  } else {
    $entryForm.classList.add('hidden');
    $entries.classList.remove('hidden');
    data.view = 'entries';
  }
}

const $entriesAnchor = document.querySelector(
  '.a-wrapper'
) as HTMLAnchorElement;

$entriesAnchor?.addEventListener('click', () => {
  console.log('fired');
  viewSwap('entries');
});

const $entryFormAnchor = document.querySelector('.a-button') as HTMLDivElement;

$entryFormAnchor?.addEventListener('click', () => {
  viewSwap('entry-form');
});
