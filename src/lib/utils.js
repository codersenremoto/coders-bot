export async function fetchMeme() {
  const url = 'https://www.reddit.com/r/programmingmemes.json?sort=top&t=week&limit=50';
  const res = await fetch(url);
  const data = await res.json();
  const randomIndex = Math.floor(Math.random() * data.data.children.length);
  const meme = data.data.children[randomIndex].data;

  return meme;
}

export function getCurrentWeekDay() {
  const date = new Date();
  const day = date.getDay();
  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return weekdays[day];
}

