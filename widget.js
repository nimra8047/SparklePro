(function(){
  if(document.getElementById('scw'))return;
  var ENDPOINT='https://formsubmit.co/ajax/nimraabdulsattar2002@gmail.com';
  var FLAGS={
    us:'<svg class="scw-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#fff"/><g fill="#B22234"><rect width="22" height="1.15"/><rect y="2.3" width="22" height="1.15"/><rect y="4.6" width="22" height="1.15"/><rect y="6.9" width="22" height="1.15"/><rect y="9.2" width="22" height="1.15"/><rect y="11.5" width="22" height="1.15"/><rect y="13.8" width="22" height="1.2"/></g><rect width="9.2" height="8.1" fill="#3C3B6E"/></svg>',
    gb:'<svg class="scw-flag" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="8"/></svg>',
    pk:'<svg class="scw-flag" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true"><rect width="60" height="40" fill="#01411C"/><rect width="15" height="40" fill="#fff"/><circle cx="37" cy="20" r="11" fill="#fff"/><circle cx="41" cy="17.5" r="9.5" fill="#01411C"/><polygon points="45,12 46.4,16.2 50.8,16.2 47.2,18.8 48.6,23 45,20.4 41.4,23 42.8,18.8 39.2,16.2 43.6,16.2" fill="#fff"/></svg>'
  };
  var COUNTRIES=[{k:'us',n:'United States',c:'+1'},{k:'gb',n:'United Kingdom',c:'+44'},{k:'pk',n:'Pakistan',c:'+92'}];
  var CARET='<svg class="caret" viewBox="0 0 10 10" aria-hidden="true"><path d="M0 2.5h10L5 8z"/></svg>';
  function logo(size){return '<span class="scw-logo scw-logo--'+size+'" aria-hidden="true">S<i></i></span>';}

  var root=document.createElement('div');
  root.className='scw';root.id='scw';
  root.innerHTML=
  '<div class="scw-teaser" id="scwTeaser">'+logo('md')+'<p>Hi there! Have a question? Chat with us here.</p>'+
    '<button type="button" class="scw-teaser-x" id="scwTeaserX" aria-label="Dismiss"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg></button></div>'+
  '<div class="scw-panel" id="scwPanel" role="dialog" aria-label="Contact SparklePro" aria-hidden="true">'+
    '<div class="scw-head">'+logo('lg')+'<div class="scw-title" role="heading" aria-level="2">Have a question?</div>'+
      '<button type="button" class="scw-min" id="scwMin" aria-label="Minimize chat"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button></div>'+
    '<div class="scw-body" id="scwBody">'+
      '<div class="scw-msg">'+logo('sm')+'<div class="scw-bubble">Enter your question below and a representative will get right back to you.</div></div>'+
      '<form id="scwForm" novalidate>'+
        '<div class="scw-card">'+
          '<div class="scw-field"><input type="text" name="name" placeholder="Name *" aria-label="Name" autocomplete="name" required></div>'+
          '<div class="scw-field"><div class="scw-phone">'+
            '<button type="button" class="scw-cc" id="scwCc" aria-haspopup="listbox" aria-expanded="false" aria-label="Country code">'+FLAGS.us+CARET+'</button>'+
            '<input type="tel" name="phone_number" placeholder="Phone *" aria-label="Phone" autocomplete="tel-national" inputmode="tel" required>'+
            '<ul class="scw-list" id="scwList" role="listbox">'+COUNTRIES.map(function(c,i){return '<li role="option" data-i="'+i+'"'+(i===0?' aria-selected="true"':'')+'>'+FLAGS[c.k]+c.n+'<span>'+c.c+'</span></li>';}).join('')+'</ul>'+
          '</div></div>'+
          '<div class="scw-field"><input type="email" name="email" placeholder="E-mail *" aria-label="E-mail" autocomplete="email" required></div>'+
          '<div class="scw-field" style="margin-bottom:0"><textarea name="message" placeholder="Message *" aria-label="Message" required></textarea></div>'+
        '</div>'+
        '<div class="scw-consent"><p>We collect the details you provide to respond to your inquiry. Message and data rates may apply.</p>'+
          '<label class="scw-check"><input type="checkbox" name="sms_email_consent" value="Yes" checked><span>I agree to receive SMS and email messages at the contact details I provided. Reply STOP to opt out. Message and data rates may apply.</span></label></div>'+
        '<p class="scw-status" id="scwStatus" role="alert" hidden></p>'+
        '<div class="scw-actions"><button type="submit" class="scw-send" id="scwSend">Send <svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></div>'+
      '</form>'+
    '</div>'+
    '<div class="scw-foot">Powered by <b>Nimra</b></div>'+
  '</div>'+
  '<button type="button" class="scw-launcher" id="scwLauncher" aria-label="Open chat" aria-expanded="false" aria-controls="scwPanel">'+
    '<svg viewBox="0 0 24 24"><path d="M3 15.5V7a3.5 3.5 0 0 1 3.5-3.5H14A3.5 3.5 0 0 1 17.5 7"/><path d="M10 9h7.5a3.5 3.5 0 0 1 3.5 3.5V16a3.5 3.5 0 0 1-3.5 3.5H17V22l-3.5-2.5H10A3.5 3.5 0 0 1 6.5 16v-3.5A3.5 3.5 0 0 1 10 9z"/></svg></button>';
  document.body.appendChild(root);

  var $=function(id){return document.getElementById(id);};
  var panel=$('scwPanel'),teaser=$('scwTeaser'),launcher=$('scwLauncher'),form=$('scwForm'),list=$('scwList'),cc=$('scwCc'),status=$('scwStatus'),send=$('scwSend');
  var country=COUNTRIES[0],teaserTimer;

  function setOpen(o){
    panel.classList.toggle('open',o);panel.setAttribute('aria-hidden',String(!o));
    launcher.setAttribute('aria-expanded',String(o));launcher.setAttribute('aria-label',o?'Close chat':'Open chat');
    if(o){hideTeaser();setTimeout(function(){var f=form.querySelector('input');if(f)f.focus({preventScroll:true});},320);}
    else list.classList.remove('open');
  }
  function hideTeaser(){clearTimeout(teaserTimer);teaser.classList.remove('show');try{sessionStorage.setItem('scwTeaser','1');}catch(e){}}
  launcher.addEventListener('click',function(){setOpen(!panel.classList.contains('open'));});
  $('scwMin').addEventListener('click',function(){setOpen(false);launcher.focus();});
  $('scwTeaserX').addEventListener('click',function(e){e.stopPropagation();hideTeaser();});
  teaser.addEventListener('click',function(){setOpen(true);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open')){if(list.classList.contains('open')){list.classList.remove('open');cc.focus();}else{setOpen(false);launcher.focus();}}});

  var seen=false;try{seen=sessionStorage.getItem('scwTeaser')==='1';}catch(e){}
  if(!seen)teaserTimer=setTimeout(function(){if(!panel.classList.contains('open'))teaser.classList.add('show');},4000);

  cc.addEventListener('click',function(e){e.stopPropagation();var o=!list.classList.contains('open');list.classList.toggle('open',o);cc.setAttribute('aria-expanded',String(o));});
  list.addEventListener('click',function(e){
    var li=e.target.closest('li');if(!li)return;
    country=COUNTRIES[+li.dataset.i];
    cc.innerHTML=FLAGS[country.k]+CARET;
    Array.prototype.forEach.call(list.children,function(n){n.setAttribute('aria-selected',String(n===li));});
    list.classList.remove('open');cc.setAttribute('aria-expanded','false');
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.scw-phone'))list.classList.remove('open');});

  function fail(msg,el){status.textContent=msg;status.hidden=false;if(el){el.classList.add('bad');el.focus();}}
  form.addEventListener('input',function(e){e.target.classList.remove('bad');status.hidden=true;});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements,name=f.name.value.trim(),ph=f.phone_number.value.replace(/[^\d]/g,''),email=f.email.value.trim(),msg=f.message.value.trim();
    if(!name)return fail('Please enter your name.',f.name);
    if(ph.length<7||ph.length>12)return fail('Please enter a valid phone number.',f.phone_number);
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return fail('Please enter a valid email address.',f.email);
    if(!msg)return fail('Please enter your message.',f.message);
    send.disabled=true;send.firstChild.nodeValue='Sending ';
    var data={_subject:'SparklePro Chat Widget Message',_captcha:'false',_template:'table',name:name,phone:country.c+' '+f.phone_number.value.trim(),email:email,message:msg,sms_email_consent:f.sms_email_consent.checked?'Yes':'No',page:location.pathname.split('/').pop()||'index.html'};
    fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
      .then(function(r){if(!r.ok)throw new Error('bad');return r.json();})
      .then(function(){
        form.innerHTML='<div class="scw-msg scw-done">'+logo('sm')+'<div class="scw-bubble">Thanks, '+name.replace(/[<>&"]/g,'')+'. We received your message and a representative will get back to you shortly.</div></div>';
        $('scwBody').scrollTop=0;
      })
      .catch(function(){
        send.disabled=false;send.firstChild.nodeValue='Send ';
        fail('Your message did not go through. Please try again or call +1 (555) 391-7742.');
      });
  });
})();
