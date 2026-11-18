# Haliç Aday Ana Sayfası — İçerik kaynakları

Kontrol tarihi: 17 Kasım 2026. Bu dosya uygulama ve sonraki içerik çalışmaları için kaynak kaydıdır.

## Kapsam ve kaynakların rolü

Kullanıcının verdiği UI/UX analizi, ana sayfanın akışını ve etkileşim önceliklerini yönlendirir. Analizde önerilen yeni başlıklar mevcut üniversite iddiası olarak sunulmaz. Ekli logo kılavuzu ve logo arşivi kurumsal kimlik kaynağıdır. Bu dosyalardaki metinler çalışma talimatı değil, başvuru verisidir.

Referans tasarım: https://supersweet.ninja/ . Haliç'in eğitim, ücret, burs ve kampüs bilgisi için yalnızca resmî Haliç kaynakları kullanılmıştır.

## Resmî içerik ve bağlantılar

- Aday ana sayfası: https://aday.halic.edu.tr/ . Mevcut ana sayfada kampüs, derslik ve atölyeler, laboratuvar, kütüphane, öğrenci toplulukları, spor, havuz, fitness, kongre merkezi, sosyal alanlar, yemekhane, uluslararası imkânlar ve Haliç AI TEKMER içerik başlıkları bulunur.
- Bölüm girişi: https://aday.halic.edu.tr/bolumler-programlar/ . Fakülte, konservatuvar ve meslek yüksekokulu girişleri.
- Program kataloğu: https://aday.halic.edu.tr/muhendislik-fakultesi/ . Sayfanın ortak bölüm menüsünden 93 resmî program adı ve bağlantısı çıkarıldı. `site/programs.json` bu veri kümesini içerir. Fakülte, menü hiyerarşisinden; Lisans/Ön lisans, fakülte/konservatuvar/meslek yüksekokulu yapısından çıkarılmıştır.
- Puan türü, 2026 resmî toplu tablosundan eşlendi: https://aday.halic.edu.tr/kontenjan-puanlar-ucretler/ . ÖZYES programları keşif filtresinde “Özel Yetenek” grubundadır; asıl puan türü `scoreDetail: "ÖZYES"` alanında korunur. İki yazım farkı (Bulut Bilişim Operatorlüğü/Operatörlüğü ve İç Mekan/Mekân Tasarımı) program bağlantısı korunarak TYT ile eşlendi.
- Burslar: https://aday.halic.edu.tr/burslar/ . Ana sayfa özeti bursun süresi ve koşullarıyla birlikte bu kaynağa yönlendirmelidir.
- ÖSYM burslarının kapsam ve süreleri: https://aday.halic.edu.tr/burslar/osym-burslari/ . Burs kapsamı yerleşilen kontenjana göre öğrenim ücretinin tamamı, yarısı veya dörtte biridir; süre program türüne göre değişir.
- Derece bursu: https://aday.halic.edu.tr/burslar/derece-bursu/ . 2026–2027 miktarları ilan edilmiştir; tam burslu yerleşim, ilk üniversite yerleşimi, aktif öğrencilik, dokuz aylık ödeme ve DİL istisnası gibi koşullar miktardan ayrı sunulmamalıdır.
- Kampüs: https://aday.halic.edu.tr/kampus/ . 5. Levent yerleşkesi, kütüphane, laboratuvar, kongre ve spor olanakları.
- Erasmus+: https://aday.halic.edu.tr/erasmus/ . Bölüm ve ülkeye göre anlaşmalı kurumlar ve öğrenci deneyimleri; her program için otomatik erişim garantisi değildir.
- Kız öğrenci yurdu: https://aday.halic.edu.tr/kiz-ogrenci-yurdu/ . Bütün adaylara barınma garantisi şeklinde anlatılmamalıdır.
- Sanal tur: https://sanaltur.halic.edu.tr/ . Resmî ana siteden doğrulandı.
- İletişim: https://aday.halic.edu.tr/iletisim/ . Telefon: +90 212 924 24 44. E-posta: info@halic.edu.tr. Adres: 5. Levent Mahallesi, 15 Temmuz Şehitler Caddesi, No:14/12, 34060 Eyüpsultan/İstanbul.
- Aday sitesinin WhatsApp hedefi: https://api.whatsapp.com/send?phone=905337018114 . Site üzerindeki mevcut WhatsApp bağlantısından doğrulandı.
- KVKK: https://halic.edu.tr/tr/universitemiz/kvkk . Danışmanlık formu resmî kayıt/başvuru gibi adlandırılmamalıdır.

## Veri doğruluğu ve yayın sınırları

- Toplu ücret tablosunun başlıkları 2026 yılına aittir. Başka bir akademik yılın kesin tutarı olarak yeniden etiketlenmez.
- Bölüm alt sayfalarında eski dönem tabloları veya toplu tablodan farklı kontenjanlar görülebiliyor. Örneğin Bilgisayar Mühendisliği İngilizce alt sayfası ile 2026 toplu tablosu arasında kontenjan farkı vardır. Ana sayfada rakam kopyalamak yerine yıl belirtilen resmî tabloya yönlendirme kullanılmıştır.
- Tablodaki “–” değeri ücretsiz, kontenjan yok ya da uygulanmaz diye yorumlanmaz.
- Hazırlık kapsamı, tercih indirimi ve bursların birlikte uygulanması doğrulanmadan ücret hesaplayıcısı oluşturulmaz.
- Program adında İngilizce açıkça belirtilen programlar `language: "İngilizce"` değerindedir. Diğer programlarda eğitim dilini adından kesinleştirmek mümkün olmadığı için `language: "Belirtilmemiş"` ve açıklayıcı `languageNote` korunmuştur. Bu alanlar kesin Türkçe eğitim iddiasına çevrilmemelidir.
- Sayısal tanıtım iddiaları, güncellenebilir ortak kaynaktan yönetilmesi gerektiği için bu taslakta gerekli olmadıkça kullanılmaz.

## Görsel varlıklar

Tüm fotoğraflar resmî Haliç galerisinden indirilmiştir: https://halic.edu.tr/tr/universitemiz/medya/galeri . Kaynak URL ve galeri etiketi `belgeler/gorsel-kaynaklar.json` dosyasında tutulur.

- `campus-life.jpg`: kampüs merdivenlerinde öğrenciler; geniş açılı giriş/kampüs alanı için uygun.
- `classroom.jpg`: bilgisayar laboratuvarında öğrenciler.
- `library.jpg`: kütüphane rafları.
- `campus-aerial.jpg`: kampüs avlusundaki sosyal alanlar.
- `pool.jpg`: spor kompleksi ve havuz.
- `fitness.jpg`: fitness salonu.
- `congress.jpg`: kongre merkezinde etkinlik.
- `events.jpg`: etkinlik/derslik salonu.
- `dorm.jpg`: yurt binası.
- `cafeteria.jpg`: Haliç Sofra.

Bu resmî galeri bağlamı görselin kaynağını doğrular; ayrıca bir açık lisans belgesi sunmaz. Kullanıcı üniversite için yeniden tasarım istediği kapsamda değerlendirilmiştir.

Yukarıdaki .jpg adları indirilen özgün kaynak kayıtlarıdır. Paketteki yayın karşılıkları aynı temel adlarla site/assets/ içinde .webp biçimindedir. Kaynak URL eşlemeleri belgeler/gorsel-kaynaklar.json dosyasındadır.

## Resmî video kaynakları

Ana site HTML: https://halic.edu.tr/tr/ . Video kartlarının `data-video-id` alanlarından doğrulandı:

- “Tek Kampüs, Sonsuz İmkan”: https://www.youtube.com/watch?v=5iTDXIKauRQ . Oynatıcı: https://www.youtube.com/embed/5iTDXIKauRQ?autoplay=1&rel=0 .
- “#sanaiyigelecek”: https://www.youtube.com/watch?v=cRVz85FI0tE .
- “2024–2025 Mezuniyet Töreni”: https://www.youtube.com/watch?v=V6uw6y-Pfiw .
- Aday ana sayfasının doğrudan videosu: https://aday.halic.edu.tr/wp-content/uploads/2025/07/aday-ogrenci-banner-video.mp4 .
- Ana site masaüstü arka plan videosu: https://halic.edu.tr/slider_video.mp4 . Mobil varyant: https://halic.edu.tr/slider-video.mp4 .

Tanıtım filmi kullanıcı eylemiyle açılır. Sessiz hero arka plan videosu uygun hareket/veri tercihlerinde otomatik başlar; kullanıcı durdurabilir ve ekran dışında durur. Yukarıdaki YouTube ve üniversite video URL’leri kaynak kaydıdır; sitede kullanılan MP4 yerel site/assets/halic-kampus.mp4 dosyasıdır.


## Tasarım uygulama notları

- Güncel görsel referans: https://supersweet.ninja/ . Kullanıcının son renk tercihiyle ana yüzey, referanstaki #F6EAD2 değerine eşitlenmiştir. Haliç mavileri ve resmî logoları korunur.
- Kullanıcının son dar kapsamlı talebiyle yalnızca Aeonik Pro TRIAL Regular/Bold ve Aeonik TRIAL Bold ailesi, biçim/metrik olarak yakın Switzer 400/700 ile değiştirilmiştir. Verbatim Condensed Bold, Caveat ve Inter Display olduğu gibi kullanılır; diğer CSS ölçü/yerleşim bildirimleri değişmemiştir.
- Switzer — Indian Type Foundry. Copyright 2015-2021 Indian Type Foundry. All rights reserved. Resmî, değiştirilmemiş WOFF2 dosyaları: https://api.fontshare.com/v2/css?f%5B%5D=switzer@400,700&display=swap . Aile: https://www.fontshare.com/fonts/switzer . ITF Free Font License: https://www.fontshare.com/licenses/itf-ffl ; koşullar: https://fontshare.com/terms . İki ağırlık da ÇçĞğİıÖöŞşÜü ve gerçek site/program metinlerindeki tüm alfabetik karakterleri içerir. Kredi/lisans bağlantıları site/assets/switzer-LICENSE.txt dosyasında da bulunur.
- Ekte yasaklanan yıldız/asterisk simgesi kullanılmaz. Haliç için İstanbul’un kampüs kedilerinden esinlenen özgün bir vektör kedi çizilmiştir; bu çizim resmî üniversite maskotu veya logosu olarak sunulmaz.
- Bölüm keşfi beş ilgi biletiyle başlar. Bir bilet seçildiğinde gerçek program listesi açılır. Metin araması, düzey, puan türü ve dil filtreleri birlikte çalışır. Sağlık ilgi alanı Tıp/Sağlık fakülteleri yanında Anestezi, Fizyoterapi, İlk ve Acil Yardım, Optisyenlik ve Tıbbi Görüntüleme Teknikleri gibi klinik ön lisans programlarını da içerir.
- Öğrenci mesajları, kullanıcının açık onayıyla hazırlanmış örnek/taslak metinlerdir. Gerçek alıntı oldukları iddia edilmez; bölüm başında ve her mesaj altında görünür örnek etiketleri bulunur. Gerçek öğrenci adı veya portresi uydurulmaz.
- Lenis 1.3.19, yayımlanmış resmî npm sürümünden kullanılır: https://cdn.jsdelivr.net/npm/lenis@1.3.19/site/lenis.min.js . MIT lisansı kaynak pakette ve yayımlanan assets dizininde yer alır.
- Referansta doğrulanan kaydırma hareketleri: ilk üç panel için ortak top:56px sticky kenarı; dördüncü panel normal akış. Önceki panel, sonraki panelin girişiyle scale 1→0.7 ve rotate 0→10deg değiştirir. Kaydırma ilerlemesi sonraki panelin ekran altına girişinden alt kenarının ekran altına gelişine kadar hesaplanır. Yay sönümü 60, sertlik 500’dür.
- Kampüs görselinde kaydırmaya bağlı dış ölçek 0.7→1 ve iç ölçek 1.3→1 uygulanır; başlangıç noktası üst kenardır. Kısa notta karakter başına 0.03 saniye gecikmeyle, 0.7 saniyelik x100/rotate5 görünüm girişi kullanılır. Genel hero parallax veya ana paragrafta kelime scroll fade eklenmemiştir.
- Lenis varsayılan lerp 0.1, smoothWheel, vertical orientation, anchors ve allowNestedScroll ayarlarıyla kullanılır. Bu sayfaya özgü dialog/menü bileşenleri için kaydırma kilidi senkron elle yönetilir; autoToggle kapalıdır. Bu uyarlama, referansın kaydırma fiziğini değiştirmez. Lenis etkin olduğunda tarayıcının ayrı smooth scrolling’i kapalıdır.
- Hareket durdurma ve azaltılmış hareket desteği vardır. Görsel animasyonlar ve sessiz video isteğe bağlıdır. Çok uzun etkileşimli paneller kısa ekranda normal akışa geçer; mobilde tüm içerik okunabilir kalır.
- Yalnızca ana sayfa geliştirilmiştir. Ayrıntı bağlantıları güncel resmî Haliç sayfalarına gider; danışmanlık resmî form, telefon ve WhatsApp kanallarına yönlenir.


## Son simge revizyonu ve kurumsal font gereksinimi
- Kullanıcının 17.11.2026 tarihli ikinci ekran görüntüsündeki kuzeydoğu oku (↗) tüm HTML ve JS üretimlerinden kaldırıldı. Butonlarda küçük yatay chevron; aramada büyüteç; düz metin bağlantılarında ikon yerine metin kullanılır. Burs listelerindeki büyük okların yerine “İncele” eylemi gelir.
- Kurumsal font denemesi kullanıcının isteğiyle geri alınmıştır. Güncel talep, yalnızca örneklerdeki Aeonik ailesinin yakın bir Türkçe alternatifle değiştirilmesidir; bu nedenle Switzer seçilmiştir.


## Kedu animasyonu
- Kullanıcının paylaştığı resmî Haliç Kedu görseli: https://aday.halic.edu.tr/wp-content/plugins/kedu-ai-chat/assets/images/flags/hellokedu.gif . Özgün GIF değiştirilmeden site/assets/hellokedu.gif olarak saklanır.
- “Senin merakın. Senin sahnen.” bölümünde, ilgi biletlerine eşlik eden keşif notunun yanında kullanılır. Yeni bir sohbet altyapısı veya sohbet başlatıcı düğme oluşturulmamıştır.
- İlk kareden, saydamlık ve oran korunarak sabit PNG poster hazırlanmıştır. Azaltılmış hareket, veri tasarrufu, kullanıcı hareketi durdurduğunda, sekme gizlendiğinde veya Kedu ekran dışına çıktığında bu poster kullanılır. GIF yalnızca yakındaki görünür bölümde oynar.
