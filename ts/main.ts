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
