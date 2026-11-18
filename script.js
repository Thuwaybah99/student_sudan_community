/* Your photographs live in the public GitHub repository supplied for this project.
   If you prefer to host them inside the website, replace each URL below with
   an assets/filename.jpeg path and upload the images to that directory. */
const repository = 'https://raw.githubusercontent.com/Thuwaybah99/student_sudan_community/main/';
const photoFiles = {
  finalDay: 'WhatsApp Image 2026-11-18 at 16.48.19.jpeg',
  gathering: 'WhatsApp Image 2026-11-18 at 16.48.31 (1).jpeg',
  certificateJunior: 'WhatsApp Image 2026-11-18 at 16.48.31 (4).jpeg',
  happy: 'WhatsApp Image 2026-11-18 at 16.48.31 (5).jpeg',
  holding: 'WhatsApp Image 2026-11-18 at 16.48.31 (6).jpeg',
  certificatePeers: 'WhatsApp Image 2026-11-18 at 16.48.31.jpeg'
};
const captions = {
  finalDay: 'My final day as a university student',
  gathering: 'Before the appreciation certificate ceremony, with my peers',
  certificateJunior: 'The certificate I received from students in a junior batch',
  happy: 'A happy moment during the appreciation gathering with my peers',
  holding: 'Holding the certificate my fellow students gave me',
  certificatePeers: 'The actual certificate of appreciation from my peers'
};
const photoUrl = key => repository + encodeURIComponent(photoFiles[key]);
document.querySelectorAll('img[data-photo]').forEach(img => {
  const key = img.dataset.photo;
  if (photoFiles[key]) img.src = photoUrl(key);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}));

const modal = document.getElementById('photo-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
document.querySelectorAll('[data-open-photo]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.openPhoto;
  if (!photoFiles[key]) return;
  modalImage.src = photoUrl(key);
  modalImage.alt = captions[key];
  modalCaption.textContent = captions[key];
  if (typeof modal.showModal === 'function') modal.showModal();
}));
document.getElementById('modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
modal.addEventListener('close', () => { modalImage.removeAttribute('src'); });

const play = document.getElementById('play-video');
play.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/r80GV8-zdxE?autoplay=1&rel=0';
  frame.title = 'Video from the student appreciation event';
  frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  frame.setAttribute('allowfullscreen', '');
  const target = document.getElementById('video-target');
  target.replaceChildren(frame);
  target.hidden = false;
  play.closest('.video-poster').hidden = true;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, {threshold: .07, rootMargin: '0px 0px -24px 0px'});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view')); }
