(function () {
  'use strict';

  var ANCHOR = 'list-split-sticky';
  var built  = false;

  /* ── Helpers ──────────────────────────────────────────────── */

  function getImgSrc(imgEl) {
    if (!imgEl) return '';
    var src = imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '';
    return src ? src.split('?')[0] + '?format=1000w' : '';
  }

  /* ── Activate an item ────────────────────────────────────── */

  var activeIndex = -1;

  function activate(index, items, layers, lis) {
    if (index === activeIndex) return;
    activeIndex = index;

    layers.forEach(function (layer, i) {
      layer.classList.toggle('lss-active', i === index);
    });

    lis.forEach(function (li, i) {
      li.classList.toggle('lss-active', i === index);
    });

    var item    = items[index];
    var prehead = document.getElementById('lss-image-prehead');
    var title   = document.getElementById('lss-image-title');
    var bgNum   = document.getElementById('lss-image-bg-num');
    if (prehead) prehead.textContent = item.numStr;
    if (title)   title.textContent   = item.title;
    if (bgNum)   bgNum.textContent   = item.numStr;
  }

  /* ── Read Squarespace layout values ─────────────────────── */

  function readSquarespaceLayout(section, ul) {
    var result = {};

    var listDiv      = section.querySelector('.user-items-list');
    result.padTop    = (listDiv && listDiv.style.paddingTop)    || '6.6vmax';
    result.padBottom = (listDiv && listDiv.style.paddingBottom) || '6.6vmax';

    var cs  = window.getComputedStyle(ul);
    var padL = cs.paddingLeft;
    var padR = cs.paddingRight;
    var maxW = cs.maxWidth;

    result.padLeft  = (padL && padL !== '0px') ? padL : null;
    result.padRight = (padR && padR !== '0px') ? padR : null;
    result.maxWidth = (maxW && maxW !== 'none' && maxW !== '0px') ? maxW : null;

    /* H2 font family for overlay elements */
    var h2 = document.querySelector('h2');
    if (h2) {
      var h2cs        = window.getComputedStyle(h2);
      result.h2Size   = h2cs.fontSize;
      result.h2Weight = h2cs.fontWeight;
      result.h2Family = h2cs.fontFamily;
    }

    return result;
  }

  /* ── Build ────────────────────────────────────────────────── */

  function buildLayout() {
    if (built) return;

    var section = document.querySelector('#' + ANCHOR);
    if (!section) return;
    if (section.querySelector('.lss-wrapper')) { built = true; return; }

    var ul = section.querySelector('.user-items-list-item-container');
    if (!ul) return;

    var lis = ul.querySelectorAll('.list-item');
    if (!lis.length) return;

    var layout = readSquarespaceLayout(section, ul);
    built = true;

    /* Extract image src and title text per item for overlay */
    var items = Array.prototype.map.call(lis, function (li, i) {
      var titleEl = li.querySelector('.list-item-content__title');
      var imgEl   = li.querySelector('img');
      return {
        numStr: i < 9 ? '0' + (i + 1) : String(i + 1),
        title:  titleEl ? titleEl.textContent.trim() : '',
        imgSrc: getImgSrc(imgEl)
      };
    });

    /* Image column — one stacked layer per item */
    var imgCol = document.createElement('div');
    imgCol.className = 'lss-image';

    var layers = items.map(function (item, i) {
      var layer = document.createElement('div');
      layer.className = 'lss-bg-layer' + (i === 0 ? ' lss-active' : '');
      if (item.imgSrc) layer.style.backgroundImage = 'url(' + item.imgSrc + ')';
      imgCol.appendChild(layer);
      return layer;
    });

    var overlay = document.createElement('div');
    overlay.className = 'lss-image-overlay';

    var bgNum = document.createElement('div');
    bgNum.className   = 'lss-image-bg-num';
    bgNum.id          = 'lss-image-bg-num';
    bgNum.textContent = items[0].numStr;

    var meta = document.createElement('div');
    meta.className = 'lss-image-meta';

    var prehead = document.createElement('div');
    prehead.className   = 'lss-image-prehead';
    prehead.id          = 'lss-image-prehead';
    prehead.textContent = items[0].numStr;

    var imgTitle = document.createElement('div');
    imgTitle.className   = 'lss-image-title';
    imgTitle.id          = 'lss-image-title';
    imgTitle.textContent = items[0].title;
    if (layout.h2Family) imgTitle.style.fontFamily = layout.h2Family;

    meta.appendChild(prehead);
    meta.appendChild(imgTitle);
    imgCol.appendChild(overlay);
    imgCol.appendChild(bgNum);
    imgCol.appendChild(meta);

    activeIndex = 0;

    /* List column — move original SS list items in, hide their images */
    var list = document.createElement('div');
    list.className = 'lss-list';

    var lisArray = Array.prototype.slice.call(lis);

    lisArray.forEach(function (li, i) {
      /* Inject number */
      var num = document.createElement('div');
      num.className   = 'lss-item-num';
      num.textContent = items[i].numStr;
      li.insertBefore(num, li.firstChild);

      /* Hide the image inside each list item */
      var liImg = li.querySelector('.list-item-content__media, .list-item-media, figure, .media-card');
      if (liImg) liImg.style.display = 'none';

      /* Also hide any img tag directly if above selectors missed it */
      var imgTag = li.querySelector('img');
      if (imgTag) {
        var imgWrapper = imgTag.closest('.list-item-content__media, figure, .media-card');
        if (imgWrapper) imgWrapper.style.display = 'none';
      }

      /* Set mobile image var for ::before pseudo-element */
      if (items[i].imgSrc) li.style.setProperty('--lss-mobile-img', 'url(' + items[i].imgSrc + ')');

      if (i === 0) li.classList.add('lss-active');

      list.appendChild(li);
    });

    /* Wrapper */
    var wrapper = document.createElement('div');
    wrapper.className = 'lss-wrapper';

    if (layout.h2Size)   wrapper.style.setProperty('--lss-h2-size',   layout.h2Size);
    if (layout.h2Weight) wrapper.style.setProperty('--lss-h2-weight', layout.h2Weight);
    if (layout.h2Family) wrapper.style.setProperty('--lss-h2-family', layout.h2Family);

    wrapper.style.paddingTop    = layout.padTop;
    wrapper.style.paddingBottom = layout.padBottom;
    if (layout.padLeft)  wrapper.style.paddingLeft  = layout.padLeft;
    if (layout.padRight) wrapper.style.paddingRight = layout.padRight;
    if (layout.maxWidth) {
      wrapper.style.maxWidth   = layout.maxWidth;
      wrapper.style.marginLeft = wrapper.style.marginRight = 'auto';
    }

    wrapper.appendChild(imgCol);
    wrapper.appendChild(list);

    var container = section.querySelector('.content-wrapper .content') ||
                    section.querySelector('.content')                   ||
                    section.querySelector('.user-items-list');

    if (!container) { built = false; return; }
    container.appendChild(wrapper);

    /* ── Scroll trigger — image swaps when title crosses 50vh ── */
    var ticking = false;

    function checkScroll() {
      var mid  = window.innerHeight * 0.5;
      var best = 0;

      lisArray.forEach(function (li, i) {
        var titleEl = li.querySelector('.list-item-content__title');
        if (titleEl && titleEl.getBoundingClientRect().top <= mid) best = i;
      });

      activate(best, items, layers, lisArray);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkScroll);
      }
    }, { passive: true });

    requestAnimationFrame(function () {
      requestAnimationFrame(checkScroll);
    });
  }

  /* ── Init — identical pattern to original ────────────────── */

  function tryBuild() { if (!built) buildLayout(); }

  tryBuild();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBuild);
  }

  if (!built && typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function (mutations, obs) {
      var section = document.querySelector('#' + ANCHOR);
      if (section && section.querySelector('.list-item')) {
        obs.disconnect();
        tryBuild();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); }, 15000);
  }

})();
