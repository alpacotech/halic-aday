# Haliç Üniversitesi Aday Öğrenci — Ana Sayfa

Haliç Üniversitesi kurumsal kimliği ve resmî içerikleriyle hazırlanmış, Supersweet referansının Verbatim/Aeonik tipografisini, sticker başlıklarını ve hareket dilini izleyen tek sayfalık site.

## Yerel çalıştırma

Proje dizininde `python3 -m http.server 4173 --directory dist` çalıştırıp http://localhost:4173 adresini açın. `index.html` dosyasını doğrudan açmak, program JSON dosyasının tarayıcı tarafından yüklenmesini engelleyebilir.

## Kapsam

- 93 resmî programda Türkçe karakter duyarlı arama, eğitim düzeyi/puan türü/dil filtreleri, boş sonuç ve sıfırlama.
- Program penceresi ve seçimin ücret alanına aktarılması.
- Kurumsal logo ve renkler; masaüstü/mobil menü; klavye odağı ve azaltılmış hareket desteği.
- Katmanlı sticker başlıklar, kayan ilgi alanı şeridi, ekrana sığdığında üst üste gelen paneller; masaüstünde fotoğraf ızgarası, mobilde yatay kampüs galerisi.
- Tek düğmeyle durabilen sessiz arka plan videosu ve hareketler; ayrıca kontrollü tanıtım filmi ve soru-cevap alanı.
- Telefon, doğrulanmış WhatsApp ve mevcut resmî bilgi talep formuna yönlendirme.

Yalnızca ana sayfa geliştirilmiştir. Ayrıntı bağlantıları güncel resmî sitelere gider. Ücret hesaplayıcısı veya yeni bir başvuru altyapısı eklenmemiştir. İçerik kaynakları ve veri sınırları SOURCES.md içinde açıklanır.

## Kontroller (Supersweet tasarım sürümü)

Masaüstü ve 390px telefon görünümünde arama, filtreler, programdan ücret alanına geçiş, boş sonuç, mobil menü, galeri, sekmeler, soru-cevap ve video oynatma kontrol edildi. Tarayıcı konsolunda hata bulunmadı. JavaScript söz dizimi, 93 program kaydı, yerel dosyalar ve HTML kimlikleri kontrol edildi.
