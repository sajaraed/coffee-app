import classicCappuccinoImg from '../assets/images/ClassicCappuccino.jpg';
import classicColdBrewImg from '../assets/images/ClassicColdBrew.jpg';
import darkMochaImg from '../assets/images/DarkMocha.jpg';
import icedCaramelMacchiatoImg from '../assets/images/IcedCaramelMacchiato.jpg';
import icedSpanishLatteImg from '../assets/images/IcedSpanishLatte.jpg';
import singleEspressoImg from '../assets/images/SingleEspresso.jpg';
import vanillaLatteImg from '../assets/images/VanillaLatte.jpg';
import guatemalaAntiguaImg from '../assets/images/GuatemalaAntigua.png';
import brazilMogianaImg from '../assets/images/BrazilMogiana.png';
import specialtyHouseBlendImg from '../assets/images/SpecialtyHousBlend.png';
import colombiaHuilaImg from '../assets/images/CoffeeBeans.jpg'; 
import flatWhiteImg from '../assets/images/FlatWhite.jpg';
import icedAmericanoImg from '../assets/images/IcedAmericano.jpg';
import nuttyFrappuccinoImg from '../assets/images/NuttyFrappuccino.jpg';
import ethiopiaYirgacheffeImg from '../assets/images/EthiopiaYirgacheffe.png'; 
import tiramisuImg from "../assets/images/Tiramisu.jpg";
import cookieImg from '../assets/images/Cookie.jpg';
import cheesecakeImg from '../assets/images/Cheesecake.jpg';
import brownieImg from '../assets/images/Brownie.jpg';
import croissantImg from '../assets/images/Croissant.jpg';
export const categoriesList = [
  { id: 'all', name: { ar: 'الكل', en: 'All' } },
  { id: 'hot', name: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' } },
  { id: 'cold', name: { ar: 'مشروبات باردة', en: 'Cold Drinks' } },
  { id: 'desserts', name: { ar: 'حلويات', en: 'Desserts' } },
  { id: 'beans', name: { ar: 'حبوب القهوة', en: 'Coffee Beans' } }
];

export const products = [
  // --- مشروبات ساخنة ---
  {
    id: 'h1',
    categoryId: 'hot',
    price: 4.5,
    image: singleEspressoImg,
    name: { ar: 'إسبراسو سينجل', en: 'Single Espresso' },
    category: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
    description: { ar: 'خلاصة القهوة الغنية بطبقة الكريمة الذهبية.', en: 'Rich coffee extract with a golden crema layer.' },
    ingredients: { ar: 'حبوب بن محمصة 100%، ماء مفلتر.', en: '100% Roasted Coffee Beans, Filtered Water.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: '18غ قهوة مطحونة ناعماً، استخلاص لمدة 25-30 ثانية بحرارة 92 مئوية.', en: '18g finely ground coffee, extract for 25-30s at 92°C.' }
  },
  {
    id: 'h2',
    categoryId: 'hot',
    price: 5.5,
    image: classicCappuccinoImg,
    name: { ar: 'كابوتشينو كلاسيك', en: 'Classic Cappuccino' },
    category: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
    description: { ar: 'مزيج متوازن من الإسبراسو والحليب المبخر ورغوة غنية.', en: 'Balanced mix of espresso, steamed milk, and rich foam.' },
    ingredients: { ar: 'إسبراسو طازج، حليب بقري كامل الدسم.', en: 'Fresh Espresso, Whole Cow Milk.' },
    allergens: { ar: 'يحتوي على الحليب (اللاكتوز).', en: 'Contains Milk (Lactose).' },
    recipe: { ar: 'إسبراسو دبل + 120مل حليب مبخر برغوة كثيفة.', en: 'Double espresso + 120ml steamed milk with thick foam.' }
  },
  {
    id: 'h3',
    categoryId: 'hot',
    price: 6.0,
    image: vanillaLatteImg,
    name: { ar: 'لاتيه الفانيليا', en: 'Vanilla Latte' },
    category: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
    description: { ar: 'إسبراسو مضاف إليه الحليب الساخن ونكهة الفانيليا.', en: 'Espresso with hot milk and vanilla flavor.' },
    ingredients: { ar: 'إسبراسو، حليب مبخر، سيروب فانيليا طبيعي.', en: 'Espresso, Steamed Milk, Natural Vanilla Syrup.' },
    allergens: { ar: 'يحتوي على الحليب.', en: 'Contains Milk.' },
    recipe: { ar: 'إسبراسو سينجل + 15مل سيروب فانيليا + 180مل حليب مبخر.', en: 'Single espresso + 15ml vanilla syrup + 180ml steamed milk.' }
  },
  {
    id: 'h4',
    categoryId: 'hot',
    price: 6.5,
    image: darkMochaImg,
    name: { ar: 'موكا بالشوكولاتة الداكنة', en: 'Dark Mocha' },
    category: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
    description: { ar: 'مزيج إسبراسو مع صوص الشوكولاتة البلجيكية والحليب.', en: 'Espresso blend with Belgian dark chocolate sauce and milk.' },
    ingredients: { ar: 'إسبراسو، شوكولاتة داكنة 70%، حليب مبخر، بودرة كاكاو.', en: 'Espresso, 70% Dark Chocolate, Steamed Milk, Cocoa Powder.' },
    allergens: { ar: 'يحتوي على الحليب وصويا لسيثين.', en: 'Contains Milk and Soy Lecithin.' },
    recipe: { ar: '20غ شوكولاتة ذائبة + دبل إسبراسو + حليب مبخر.', en: '20g melted chocolate + double espresso + steamed milk.' }
  },
  {
    id: 'h5',
    categoryId: 'hot',
    price: 5.0,
    image:flatWhiteImg ,
    name: { ar: 'فلات وايت', en: 'Flat White' },
    category: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
    description: { ar: 'Double Ristretto مع حليب مبخر بطبقة رغوة ناعمة.', en: 'Double Ristretto with velvety microfoam milk.' },
    ingredients: { ar: 'دبل ريستريتو إسبراسو، حليب مبخر ناعم.', en: 'Double Ristretto Espresso, Microfoam Milk.' },
    allergens: { ar: 'يحتوي على الحليب.', en: 'Contains Milk.' },
    recipe: { ar: 'دبل ريستريتو + 130مل حليب مبخر بقوام مخملي.', en: 'Double ristretto + 130ml velvety microfoam milk.' }
  },

  // --- مشروبات باردة ---
  {
    id: 'c1',
    categoryId: 'cold',
    price: 6.5,
    image: icedCaramelMacchiatoImg,
    name: { ar: 'آيس كراميل ماكياتو', en: 'Iced Caramel Macchiato' },
    category: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
    description: { ar: 'حليب بارد مع الفانيليا والثلج وسكبة إسبراسو بصوص الكراميل.', en: 'Cold milk with vanilla, ice, and espresso drizzled with caramel.' },
    ingredients: { ar: 'حليب بارد، ثلج، إسبراسو، سيروب فانيليا، صوص كراميل.', en: 'Cold Milk, Ice, Espresso, Vanilla Syrup, Caramel Drizzle.' },
    allergens: { ar: 'يحتوي على الحليب.', en: 'Contains Milk.' },
    recipe: { ar: 'ثلج + حليب بارد + فانيليا + صب دبل إسبراسو مع كراميل.', en: 'Ice + cold milk + vanilla + top with double espresso and caramel.' }
  },
  {
    id: 'c2',
    categoryId: 'cold',
    price: 7.0,
    image: classicColdBrewImg,
    name: { ar: 'كولد برو كلاسيك', en: 'Classic Cold Brew' },
    category: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
    description: { ar: 'قهوة منقوعة بالماء البارد لمدة 12 ساعة لنكهة ناعمة.', en: 'Coffee steeped in cold water for 12 hours for a smooth taste.' },
    ingredients: { ar: 'قهوة مختصة منقوعة، ماء نقاء عالي، ثلج.', en: 'Specialty Steeped Coffee, Purified Water, Ice.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'تنقيع قهوة خشنة بنسبة 1:8 بالماء البارد لمدة 16 ساعة.', en: 'Steep coarsely ground coffee 1:8 in cold water for 16h.' }
  },
  {
    id: 'c3',
    categoryId: 'cold',
    price: 6.0,
    image: icedSpanishLatteImg,
    name: { ar: 'آيس لاتيه سبانيش', en: 'Iced Spanish Latte' },
    category: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
    description: { ar: 'إسبراسو مع الحليب المكثف المحلى والثلج القوي.', en: 'Espresso with sweetened condensed milk and ice.' },
    ingredients: { ar: 'إسبراسو، حليب مكثف محلى، حليب مبخر بارد، ثلج.', en: 'Espresso, Sweetened Condensed Milk, Cold Milk, Ice.' },
    allergens: { ar: 'يحتوي على الحليب (اللاكتوز).', en: 'Contains Milk (Lactose).' },
    recipe: { ar: '30مل حليب مكثف + 120مل حليب بارد + ثلج + دبل إسبراسو.', en: '30ml condensed milk + 120ml cold milk + ice + double espresso.' }
  },
  {
    id: 'c4',
    categoryId: 'cold',
    price: 6.5,
    image: icedAmericanoImg,
    name: { ar: 'آيس أمريكانو', en: 'Iced Americano' },
    category: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
    description: { ar: 'جرعة إسبراسو مضاعفة سُكبت فوق الماء المبرد والثلج.', en: 'Double shot espresso poured over chilled water and ice.' },
    ingredients: { ar: 'دبل إسبراسو، ماء بارد، مكعبات ثلج.', en: 'Double Espresso, Cold Water, Ice Cubes.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'كوب ثلج + 150مل ماء بارد + دبل إسبراسو طازج.', en: 'Cup of ice + 150ml cold water + fresh double espresso.' }
  },
  {
    id: 'c5',
    categoryId: 'cold',
    price: 7.5,
    image: nuttyFrappuccinoImg,
    name: { ar: 'فرابشينو مكسرات', en: 'Nutty Frappuccino' },
    category: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
    description: { ar: 'مخفوق القهوة المثلجة مع زبدة البندق والكريمة.', en: 'Blended iced coffee with hazelnut butter and whipped cream.' },
    ingredients: { ar: 'إسبراسو، سيروب بندق، حليب، ثلج، كريمة مخفوقة.', en: 'Espresso, Hazelnut Syrup, Milk, Ice, Whipped Cream.' },
    allergens: { ar: 'يحتوي على الحليب والمكسرات (البندق).', en: 'Contains Milk and Tree Nuts (Hazelnut).' },
    recipe: { ar: 'خلط الثلج والإسبراسو والحليب وسيروب البندق وتزيينه بالكريمة.', en: 'Blend ice, espresso, milk, hazelnut syrup. Top with whipped cream.' }
  },

  // --- حلويات ---
  {
    id: 'd1',
    categoryId: 'desserts',
    price: 5.5,
    image: tiramisuImg,
    name: { ar: 'تيراميسو إيطالي', en: 'Italian Tiramisu' },
    category: { ar: 'حلويات', en: 'Desserts' },
    description: { ar: 'طبقات من البسكويت المغموس بالإسبراسو وكريمة الماركابون.', en: 'Layers of espresso-soaked ladyfingers and mascarpone cream.' },
    ingredients: { ar: 'جبن ماسكاربون، بسكويت ليدي فينجر، إسبراسو، صفار بيض، سكر، كاكاو.', en: 'Mascarpone Cheese, Ladyfingers, Espresso, Egg Yolks, Sugar, Cocoa.' },
    allergens: { ar: 'يحتوي على الحليب، البيض، والجلوتين (قمح).', en: 'Contains Milk, Eggs, and Gluten (Wheat).' },
    recipe: { ar: 'طبقات بسكويت مغموس بإسبراسو وكريمة ماسكاربون مع كاكاو.', en: 'Layers of espresso-dipped ladyfingers and mascarpone cream.' }
  },
  {
    id: 'd2',
    categoryId: 'desserts',
    price: 4.5,
    image:cookieImg ,
    name: { ar: 'كوكيز الشوكولاتة', en: 'Chocolate Chunk Cookie' },
    category: { ar: 'حلويات', en: 'Desserts' },
    description: { ar: 'كوكيز طري ومقرمش محشو بقطع الشوكولاتة الداكنة.', en: 'Soft and chewy cookie loaded with dark chocolate chunks.' },
    ingredients: { ar: 'دقيق القمح، زبدة، شوكولاتة داكنة 70%، سكر بني، بيض.', en: 'Wheat Flour, Butter, 70% Dark Chocolate, Brown Sugar, Eggs.' },
    allergens: { ar: 'يحتوي على الجلوتين، الحليب، البيض، وقد يحتوي على آثار مكسرات.', en: 'Contains Gluten, Milk, Eggs, and may contain traces of nuts.' },
    recipe: { ar: 'خبز العجينة بالشوكولاتة البلجيكية لمدة 10 دقائق على 180 مئوية.', en: 'Bake dough with Belgian chocolate for 10 mins at 180°C.' }
  },
  {
    id: 'd3',
    categoryId: 'desserts',
    price: 6.0,
    image:cheesecakeImg ,
    name: { ar: 'شيز كيك نيويورك', en: 'New York Cheesecake' },
    category: { ar: 'حلويات', en: 'Desserts' },
    description: { ar: 'كيكة الجبن الغنية بالقوام الكرييمي وقاعدة البسكويت.', en: 'Rich creamy cheesecake with a crunchy graham cracker crust.' },
    ingredients: { ar: 'جبن كريمي، بسكويت دايجستف، زبدة، سكر، بيض، فانيليا.', en: 'Cream Cheese, Digestive Biscuits, Butter, Sugar, Eggs, Vanilla.' },
    allergens: { ar: 'يحتوي على الحليب، البيض، والجلوتين.', en: 'Contains Milk, Eggs, and Gluten.' },
    recipe: { ar: 'قاعدة بسكويت وزبدة مع حشوة الجبن المخبوزة هادئاً.', en: 'Biscuit base with slow-baked cream cheese filling.' }
  },
  {
    id: 'd4',
    categoryId: 'desserts',
    price: 5.0,
    image: brownieImg,
    name: { ar: 'براونيز بالتوت', en: 'Berry Brownie' },
    category: { ar: 'حلويات', en: 'Desserts' },
    description: { ar: 'براونيز فادجي كثيف مع قطع التوت الأحمر الطازج.', en: 'Dense fudgy brownie studded with fresh red berries.' },
    ingredients: { ar: 'شوكولاتة ذائبة، زبدة، دقيق، توت طازج، بيض، كاكاو.', en: 'Melted Chocolate, Butter, Flour, Fresh Berries, Eggs, Cocoa.' },
    allergens: { ar: 'يحتوي على الجلوتين، الحليب، والبيض.', en: 'Contains Gluten, Milk, and Eggs.' },
    recipe: { ar: 'خلط الشوكولاتة والتوت مع العجين والخبز لمدة 20 دقيقة.', en: 'Mix chocolate and berries with dough and bake for 20 mins.' }
  },
  {
    id: 'd5',
    categoryId: 'desserts',
    price: 4.0,
    image: croissantImg,
    name: { ar: 'كرواسون الزبدة', en: 'Butter Croissant' },
    category: { ar: 'حلويات', en: 'Desserts' },
    description: { ar: 'كرواسون فرنسي هش وطازج مخبوز يومياً.', en: 'Freshly baked flaky French butter croissant.' },
    ingredients: { ar: 'دقيق القمح، زبدة فرنسية 82%، خميرة، حليب، سكر.', en: 'Wheat Flour, 82% French Butter, Yeast, Milk, Sugar.' },
    allergens: { ar: 'يحتوي على الجلوتين والحليب.', en: 'Contains Gluten and Milk.' },
    recipe: { ar: 'عجينة مورقة بالزبدة الفرنسية النقية مخبوزة طازجة.', en: 'Laminated dough with pure French butter, freshly baked.' }
  },

  // --- حبوب القهوة ---
  {
    id: 'b1',
    categoryId: 'beans',
    price: 18.0,
    image: ethiopiaYirgacheffeImg,
    name: { ar: 'إثيوبيا يورغاتشيف (250غ)', en: 'Ethiopia Yirgacheffe' },
    category: { ar: 'حبوب القهوة', en: 'Coffee Beans' },
    description: { ar: 'إيحاءات الزهور والياسمين مع الحمضية الناعمة.', en: 'Floral and jasmine notes with a refined acidity.' },
    ingredients: { ar: 'حبوب بن إثيوبية كاملة 100% مختصة.', en: '100% Whole Ethiopian Specialty Beans.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'تحميص خفيف، مثالي للـ V60. نسبة التحضير 1:15.', en: 'Light roast, best for V60 pour-over. Brew ratio 1:15.' }
  },
  {
    id: 'b2',
    categoryId: 'beans',
    price: 20.0,
    image: colombiaHuilaImg,
    name: { ar: 'كولومبيا هويلّا (250غ)', en: 'Colombia Huila' },
    category: { ar: 'حبوب القهوة', en: 'Coffee Beans' },
    description: { ar: 'نكهات الكراميل والكرز والحمضية المتوازنة.', en: 'Notes of caramel, cherry, and balanced acidity.' },
    ingredients: { ar: 'حبوب بن كولومبية كاملة 100%.', en: '100% Whole Colombian Coffee Beans.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'تحميص متوسط، ممتاز للإسبراسو وخلطات الحليب.', en: 'Medium roast, excellent for espresso and milk.' }
  },
  {
    id: 'b3',
    categoryId: 'beans',
    price: 22.0,
    image: guatemalaAntiguaImg,
    name: { ar: 'جواتيمالا أنتيجوا (250غ)', en: 'Guatemala Antigua' },
    category: { ar: 'حبوب القهوة', en: 'Coffee Beans' },
    description: { ar: 'إيحاءات الشوكولاتة الداكنة والتوابل الخفيفة.', en: 'Dark chocolate notes with subtle spice undertones.' },
    ingredients: { ar: 'حبوب بن جواتيمالية كاملة 100%.', en: '100% Whole Guatemalan Coffee Beans.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'تحميص متوسط غامق، ممتاز للفرنش بريس.', en: 'Medium-dark roast, great for French Press.' }
  },
  {
    id: 'b4',
    categoryId: 'beans',
    price: 24.0,
    image: brazilMogianaImg,
    name: { ar: 'برازيل موجيانا (250غ)', en: 'Brazil Mogiana' },
    category: { ar: 'حبوب القهوة', en: 'Coffee Beans' },
    description: { ar: 'نكهة المكسرات المحمصة والبندق وحلاوة عالية.', en: 'Roasted nut and hazelnut flavors with high sweetness.' },
    ingredients: { ar: 'حبوب بن برازيلية كاملة 100%.', en: '100% Whole Brazilian Coffee Beans.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'تحميص متوسط، حمضية منخفضة وقوام كريمي.', en: 'Medium roast, low acidity with creamy body.' }
  },
  {
    id: 'b5',
    categoryId: 'beans',
    price: 26.0,
    image: specialtyHouseBlendImg,
    name: { ar: 'سبيشالتي بليند (500غ)', en: 'Specialty House Blend' },
    category: { ar: 'حبوب القهوة', en: 'Coffee Beans' },
    description: { ar: 'مزج متناغم بين المحاصيل الإثيوبية والكولومبية.', en: 'Harmonious blend of Ethiopian and Colombian beans.' },
    ingredients: { ar: 'حبوب بن محمصة مختصة 100%.', en: '100% Whole Specialty Coffee Beans.' },
    allergens: { ar: 'خالٍ من مسببات الحساسية الشائعة.', en: 'Free from common allergens.' },
    recipe: { ar: 'خلطة ممتازة ومناسبة لجميع طرق التحضير.', en: 'House blend suitable for all daily brewing methods.' }
  }
]