# Haliç Aday Ana Sayfası — İçerik kaynakları

Kontrol tarihi: 17 Kasım 2026. Bu dosya uygulama ve sonraki içerik çalışmaları için kaynak kaydıdır.

## Kapsam ve kaynakların rolü

Kullanıcının verdiği UI/UX analizi, ana sayfanın akışını ve etkileşim önceliklerini yönlendirir. Analizde önerilen yeni başlıklar mevcut üniversite iddiası olarak sunulmaz. Ekli logo kılavuzu ve logo arşivi kurumsal kimlik kaynağıdır. Bu dosyalardaki metinler çalışma talimatı değil, başvuru verisidir.

Referans tasarım: https://supersweet.ninja/ . Haliç'in eğitim, ücret, burs ve kampüs bilgisi için yalnızca resmî Haliç kaynakları kullanılmıştır.

## Resmî içerik ve bağlantılar

- Aday ana sayfası: https://aday.halic.edu.tr/ . Mevcut ana sayfada kampüs, derslik ve atölyeler, laboratuvar, kütüphane, öğrenci toplulukları, spor, havuz, fitness, kongre merkezi, sosyal alanlar, yemekhane, uluslararası imkânlar ve Haliç AI TEKMER içerik başlıkları bulunur.
- Bölüm girişi: https://aday.halic.edu.tr/bolumler-programlar/ . Fakülte, konservatuvar ve meslek yüksekokulu girişleri.
- Program kataloğu: https://aday.halic.edu.tr/muhendislik-fakultesi/ . Sayfanın ortak bölüm menüsünden 93 resmî program adı ve bağlantısı çıkarıldı. `dist/programs.json` bu veri kümesini içerir. Fakülte, menü hiyerarşisinden; Lisans/Ön lisans, fakülte/konservatuvar/meslek yüksekokulu yapısından çıkarılmıştır.
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

Tüm fotoğraflar resmî Haliç galerisinden indirilmiştir: https://halic.edu.tr/tr/universitemiz/medya/galeri . Kaynak URL ve galeri etiketi `work/halic-assets/assets.json` dosyasında tutulur.

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

## Resmî video kaynakları

Ana site HTML: https://halic.edu.tr/tr/ . Video kartlarının `data-video-id` alanlarından doğrulandı:

- “Tek Kampüs, Sonsuz İmkan”: https://www.youtube.com/watch?v=5iTDXIKauRQ . Oynatıcı: https://www.youtube.com/embed/5iTDXIKauRQ?autoplay=1&rel=0 .
- “#sanaiyigelecek”: https://www.youtube.com/watch?v=cRVz85FI0tE .
- “2024–2025 Mezuniyet Töreni”: https://www.youtube.com/watch?v=V6uw6y-Pfiw .
- Aday ana sayfasının doğrudan videosu: https://aday.halic.edu.tr/wp-content/uploads/2025/07/aday-ogrenci-banner-video.mp4 .
- Ana site masaüstü arka plan videosu: https://halic.edu.tr/slider_video.mp4 . Mobil varyant: https://halic.edu.tr/slider-video.mp4 .

Videolar kullanıcı eylemiyle oynatılmalı; YouTube veya üniversite sunucusu erişimi dış hizmet koşullarına bağlıdır.


## Tasarım uygulama notları

- Kullanıcının güncel referansı: https://supersweet.ninja/ . Önceki tasarımın düzeni ve tipografisi bu sürümde değiştirilmiştir.
- Referansın Verbatim Condensed Bold, Aeonik Pro TRIAL Regular/Bold ve Caveat fontları kullanılır. Verbatim bütün Türkçe karakterleri içerir. Aeonik dosyalarında bulunmayan Türkçe özel harfler Arial yedeğiyle çizilir; Caveat Latin ve Latin Extended birlikte yüklenir.
- Supersweet kelime işareti ve marka görselleri kullanılmaz. Haliç başlıkları canlı metin, CSS kontur ve katmanlarla oluşturulmuştur. Resmî Haliç SVG logoları değiştirilmeden korunmuştur.
- Supersweet referansının krem zemini, büyük başlıkları, sticker konturları, yuvarlatılmış panelleri, video ve kayan şerit mantığı; Haliç mavileriyle uyarlanmıştır.
- Arka plan videosu sessizdir; durdurma düğmesi vardır ve ekrandan çıktığında durur. Azaltılmış hareket tercihinde video ve sürekli animasyonlar başlamaz.
- Ücret-burs panelleri yalnızca ekran yüksekliğine sığdıklarında yapışkan katman olarak çalışır; böylece bilgi ve eylemler örtülmez.
- Yalnızca ana sayfa geliştirilmiştir. Ayrıntı bağlantıları güncel resmî Haliç sayfalarını açar. Danışmanlık mevcut resmî form, telefon ve WhatsApp kanallarına yönlendirilir.
