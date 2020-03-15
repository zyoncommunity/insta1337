const puppeteer = require('puppeteer'); //Salimcan Satıcı 
const fs = require('fs');
var Jimp = require('jimp'); //

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36';
(async () => {


var sayilar = ["./fotograflar/ataturk.png",
     "./fotograflar/ataturk1.png",
	 "./fotograflar/ataturk2.png",
	 "./fotograflar/ataturk3.png",
     "./fotograflar/ataturk4.jpg",
     "./fotograflar/ataturk5.png",];


    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1024,
        height: 768,
  
      },
    });
    const page = await browser.newPage();
    console.log("Tarayı açılıyor.");
  await page.setUserAgent(USER_AGENT);
  console.log("Kullanıcı Ajanı tanımlandı.");
  await page.goto('https://www.instagram.com/accounts/edit/');
  console.log("Instagram edit yönlendirme sağlandı");
  await page.waitForSelector('input[name="username"]'); 
  console.log("Kullanıcı adı ve şifre için bilgiler giriliyor");


  await page.type('input[name="username"]', 'tahsinyavuztr'); //'KULLANICI_ADINIZ '  KULLANICI_ADINIZ yazan kısma yani tırnakları silmeden tırnakların içerisine kullanıcı adınızı yazınız
  console.log("Kullanıcı adı girişi tamamlandı.");
  await page.type('input[name="password"]', 'sifre'); // Aynı şekilde SIFRENIZ kısmına da o şekilde boşluk bırakmayın
  console.log("Şifre girişi tamamlandı.");

  await page.click('button[type="submit"]');
  console.log("Veri gönderiliyor..")
  blockingWait(4);
  await page.close(); //Navigation hatasını handle etmek biraz sıkıntılı ve kullandığımız modülde hata vermemesi için bir nebze page variable transfer yapıldı
  const sekme2 = await browser.newPage();
  await sekme2.setUserAgent(USER_AGENT);
  await sekme2.goto('https://www.instagram.com/accounts/edit/');
  const pageTitle = await sekme2.title();
  console.log(pageTitle)


  // for (let index = 0; index < 9999; index++) { //index = 0; kısmı kaçıncı dakikadan başlayacağını belirler v1
    
blockingWait(2); 

const inputElement = await sekme2.$('#react-root > section > main > div > article > div > div.XX1Wc > div > form > input[type="file"]'); 

    setInterval(function(){ 

      let date = new Date();
      let simdikiDakika = date.getMinutes();
      let simdikiSaat = date.getHours();
      simdikisaat = simdikiSaat+1;
      //Tarih'i çektik ***************************
let kacinciGun = date.getDate();
let kacinciayTemp= date.getMonth();
let kacinciAy = kacinciayTemp+1;
let kacinciYil = date.getFullYear();
//******************************* */

var filePath = './fogoraflar/'+simdikiDakika+'.png'; 
  fs.unlinkSync(filePath); 
  console.log(filePath+" SİLİNDİ");

 //http://lorempixel.com/320/320/ random fotoğraf çekmek için eklendi dilerseniz beyaz arkaplan bir resmin yolunu verip beyaz arkaplana da yazdırabilirsiniz.
Jimp.read("http://lorempixel.com/320/320/").then(function (delimg) { 
  
Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(function (font) { 
  delimg.blur( 20 );
  delimg.resize(320, 320) 
delimg.HORIZONTAL_ALIGN_CENTER; 
                //80 Sağa / //20 Yukarı
                // 15 sağa / // 80 yukarı
  delimg.print(font, 80, 20, simdikiSaat+":"+simdikiDakika,80) 
  delimg.print(font, 15, 80, kacinciGun+"/"+kacinciAy+"/"+kacinciYil,40) 
  delimg.write('./fotograflar/'+simdikiDakika+'.png');

  console.log(simdikiDakika+'.png'+" Yazıldı");


  inputElement.uploadFile('./fotograflar/'+simdikiDakika+'.png');
  console.log(simdikiDakika+'.png yüklendi');




});

});    



console.log("İşlem Başarılı");
},60000); //60 SANİYEDE BİR TEKRAR
    
    console.log("Bağlandı");
     
  
  }

)();


function blockingWait(seconds) {
  //basit bloklama beklemesi
  var waitTill = new Date(new Date().getTime() + seconds * 1000);
  while (waitTill > new Date()) { }
}
