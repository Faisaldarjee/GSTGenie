// GSTGenie — HSN/SAC Code Database
// Comprehensive database of commonly used HSN codes for Indian GST billing
// Source: CBIC (Central Board of Indirect Taxes and Customs)

const hsnCodes = [
  // ═══════════════════════════════════════════
  // TECHNOLOGY & IT SERVICES (SAC)
  // ═══════════════════════════════════════════
  { code: '998311', description: 'IT consulting services', rate: 18, category: 'IT Services' },
  { code: '998312', description: 'IT design and development services', rate: 18, category: 'IT Services' },
  { code: '998313', description: 'IT infrastructure provisioning services', rate: 18, category: 'IT Services' },
  { code: '998314', description: 'IT infrastructure management services', rate: 18, category: 'IT Services' },
  { code: '998315', description: 'Software maintenance and support', rate: 18, category: 'IT Services' },
  { code: '998316', description: 'Website hosting and maintenance', rate: 18, category: 'IT Services' },
  { code: '998319', description: 'Other IT services (SaaS, cloud)', rate: 18, category: 'IT Services' },
  { code: '998321', description: 'Software licensing — perpetual license', rate: 18, category: 'IT Services' },
  { code: '998322', description: 'Software licensing — subscription', rate: 18, category: 'IT Services' },
  { code: '998331', description: 'Data processing services', rate: 18, category: 'IT Services' },
  { code: '998332', description: 'Data hosting services', rate: 18, category: 'IT Services' },
  { code: '998333', description: 'Application service providers (ASP)', rate: 18, category: 'IT Services' },

  // ═══════════════════════════════════════════
  // PROFESSIONAL SERVICES (SAC)
  // ═══════════════════════════════════════════
  { code: '998211', description: 'Legal advisory and representation', rate: 18, category: 'Professional' },
  { code: '998212', description: 'Legal documentation and certification', rate: 18, category: 'Professional' },
  { code: '998221', description: 'Financial auditing services', rate: 18, category: 'Professional' },
  { code: '998222', description: 'Accounting and bookkeeping', rate: 18, category: 'Professional' },
  { code: '998223', description: 'Tax preparation and consulting', rate: 18, category: 'Professional' },
  { code: '998224', description: 'Insolvency and receivership', rate: 18, category: 'Professional' },
  { code: '998231', description: 'Management consulting', rate: 18, category: 'Professional' },
  { code: '998232', description: 'Business consulting', rate: 18, category: 'Professional' },
  { code: '998241', description: 'Architectural services', rate: 18, category: 'Professional' },
  { code: '998242', description: 'Urban planning and landscape', rate: 18, category: 'Professional' },
  { code: '998243', description: 'Engineering services', rate: 18, category: 'Professional' },
  { code: '998244', description: 'Engineering design for industrial', rate: 18, category: 'Professional' },
  { code: '998251', description: 'Scientific and technical consulting', rate: 18, category: 'Professional' },
  { code: '998252', description: 'Technical testing and analysis', rate: 18, category: 'Professional' },

  // ═══════════════════════════════════════════
  // ADVERTISING & MARKETING (SAC)
  // ═══════════════════════════════════════════
  { code: '998361', description: 'Advertising services', rate: 18, category: 'Marketing' },
  { code: '998362', description: 'Purchase or sale of advertising space', rate: 18, category: 'Marketing' },
  { code: '998363', description: 'Sale of internet advertising space', rate: 18, category: 'Marketing' },
  { code: '998364', description: 'Market research services', rate: 18, category: 'Marketing' },
  { code: '998365', description: 'Public opinion polling', rate: 18, category: 'Marketing' },
  { code: '998366', description: 'Photography and videography services', rate: 18, category: 'Marketing' },
  { code: '998367', description: 'Translation and interpretation', rate: 18, category: 'Marketing' },
  { code: '998371', description: 'Branding and graphic design', rate: 18, category: 'Marketing' },
  { code: '998372', description: 'Interior design services', rate: 18, category: 'Marketing' },
  { code: '998381', description: 'Telephone call center services', rate: 18, category: 'Marketing' },
  { code: '998382', description: 'Convention and trade show services', rate: 18, category: 'Marketing' },
  { code: '998383', description: 'Credit reporting services', rate: 18, category: 'Marketing' },

  // ═══════════════════════════════════════════
  // EDUCATION & TRAINING (SAC)
  // ═══════════════════════════════════════════
  { code: '999210', description: 'Primary education services', rate: 0, category: 'Education' },
  { code: '999220', description: 'Secondary education services', rate: 0, category: 'Education' },
  { code: '999230', description: 'Higher education services', rate: 0, category: 'Education' },
  { code: '999240', description: 'Specialized education (vocational)', rate: 18, category: 'Education' },
  { code: '999250', description: 'Training and coaching services', rate: 18, category: 'Education' },
  { code: '999259', description: 'Other education (online courses)', rate: 18, category: 'Education' },

  // ═══════════════════════════════════════════
  // COMPUTERS & ELECTRONICS (HSN)
  // ═══════════════════════════════════════════
  { code: '8471', description: 'Laptops, computers & data processing machines', rate: 18, category: 'Electronics' },
  { code: '8473', description: 'Computer parts and accessories', rate: 18, category: 'Electronics' },
  { code: '8517', description: 'Mobile phones and smartphones', rate: 12, category: 'Electronics' },
  { code: '8518', description: 'Microphones, speakers, headphones', rate: 18, category: 'Electronics' },
  { code: '8521', description: 'Video recording/reproducing apparatus', rate: 18, category: 'Electronics' },
  { code: '8523', description: 'USB drives, SD cards, storage media', rate: 18, category: 'Electronics' },
  { code: '8524', description: 'Flat panel display modules', rate: 18, category: 'Electronics' },
  { code: '8525', description: 'CCTV cameras, webcams, camcorders', rate: 18, category: 'Electronics' },
  { code: '8528', description: 'Monitors, TVs, projectors', rate: 18, category: 'Electronics' },
  { code: '8443', description: 'Printers, scanners, MFP devices', rate: 18, category: 'Electronics' },
  { code: '8504', description: 'Power adapters, UPS, chargers', rate: 18, category: 'Electronics' },
  { code: '8544', description: 'Cables, wires & connectors', rate: 18, category: 'Electronics' },
  { code: '8534', description: 'Printed circuit boards (PCB)', rate: 18, category: 'Electronics' },
  { code: '8542', description: 'Electronic integrated circuits (chips)', rate: 0, category: 'Electronics' },

  // ═══════════════════════════════════════════
  // FOOD & BEVERAGES (HSN)
  // ═══════════════════════════════════════════
  { code: '0201', description: 'Fresh/chilled bovine meat', rate: 0, category: 'Food' },
  { code: '0401', description: 'Milk and cream (not concentrated)', rate: 0, category: 'Food' },
  { code: '0402', description: 'Milk and cream (concentrated/sweetened)', rate: 5, category: 'Food' },
  { code: '0901', description: 'Coffee beans (roasted/unroasted)', rate: 5, category: 'Food' },
  { code: '0902', description: 'Tea (green or black)', rate: 5, category: 'Food' },
  { code: '1001', description: 'Wheat and meslin', rate: 0, category: 'Food' },
  { code: '1006', description: 'Rice (basmati, non-basmati)', rate: 5, category: 'Food' },
  { code: '1101', description: 'Wheat flour (atta)', rate: 0, category: 'Food' },
  { code: '1507', description: 'Soyabean oil', rate: 5, category: 'Food' },
  { code: '1512', description: 'Sunflower / Safflower oil', rate: 5, category: 'Food' },
  { code: '1701', description: 'Cane or beet sugar', rate: 5, category: 'Food' },
  { code: '1704', description: 'Sugar confectionery (chocolates)', rate: 18, category: 'Food' },
  { code: '1905', description: 'Bread, biscuits, pastry, cakes', rate: 18, category: 'Food' },
  { code: '2009', description: 'Fruit juices (packaged)', rate: 12, category: 'Food' },
  { code: '2106', description: 'Food preparations (protein powder, supplements)', rate: 18, category: 'Food' },
  { code: '2201', description: 'Mineral water, packaged drinking water', rate: 18, category: 'Food' },
  { code: '2202', description: 'Aerated drinks, soft drinks', rate: 28, category: 'Food' },

  // ═══════════════════════════════════════════
  // TEXTILES & GARMENTS (HSN)
  // ═══════════════════════════════════════════
  { code: '5208', description: 'Cotton fabrics (woven)', rate: 5, category: 'Textiles' },
  { code: '5209', description: 'Cotton fabrics (woven, heavy)', rate: 5, category: 'Textiles' },
  { code: '5407', description: 'Synthetic (polyester) fabric', rate: 5, category: 'Textiles' },
  { code: '5513', description: 'Polyester-cotton blended fabric', rate: 5, category: 'Textiles' },
  { code: '6101', description: 'Men\'s overcoats, jackets (knitted)', rate: 12, category: 'Textiles' },
  { code: '6103', description: 'Men\'s suits, trousers (knitted)', rate: 12, category: 'Textiles' },
  { code: '6104', description: 'Women\'s suits, dresses (knitted)', rate: 12, category: 'Textiles' },
  { code: '6105', description: 'Men\'s shirts (knitted/woven)', rate: 12, category: 'Textiles' },
  { code: '6106', description: 'Women\'s blouses, shirts', rate: 12, category: 'Textiles' },
  { code: '6109', description: 'T-shirts, singlets, tank tops', rate: 12, category: 'Textiles' },
  { code: '6110', description: 'Sweaters, cardigans, pullovers', rate: 12, category: 'Textiles' },
  { code: '6203', description: 'Men\'s suits, trousers (woven)', rate: 12, category: 'Textiles' },
  { code: '6204', description: 'Women\'s suits, dresses (woven)', rate: 12, category: 'Textiles' },
  { code: '6217', description: 'Clothing accessories (ties, belts)', rate: 12, category: 'Textiles' },

  // ═══════════════════════════════════════════
  // FURNITURE (HSN)
  // ═══════════════════════════════════════════
  { code: '9401', description: 'Seats, chairs (office, home)', rate: 18, category: 'Furniture' },
  { code: '9403', description: 'Furniture (tables, desks, cabinets)', rate: 18, category: 'Furniture' },
  { code: '9404', description: 'Mattresses, cushions, pillows', rate: 18, category: 'Furniture' },
  { code: '9405', description: 'Lamps, light fittings, chandeliers', rate: 18, category: 'Furniture' },

  // ═══════════════════════════════════════════
  // CONSTRUCTION & REAL ESTATE (SAC)
  // ═══════════════════════════════════════════
  { code: '995411', description: 'Construction of buildings', rate: 12, category: 'Construction' },
  { code: '995421', description: 'General construction of highways/roads', rate: 12, category: 'Construction' },
  { code: '995431', description: 'Demolition services', rate: 18, category: 'Construction' },
  { code: '995432', description: 'Site preparation services', rate: 18, category: 'Construction' },
  { code: '995461', description: 'Electrical installation services', rate: 18, category: 'Construction' },
  { code: '995462', description: 'Plumbing and HVAC services', rate: 18, category: 'Construction' },
  { code: '995468', description: 'Painting and glazing services', rate: 18, category: 'Construction' },

  // ═══════════════════════════════════════════
  // TRANSPORT & LOGISTICS (SAC)
  // ═══════════════════════════════════════════
  { code: '996511', description: 'Road transport — goods (GTA)', rate: 5, category: 'Transport' },
  { code: '996512', description: 'Road transport — passengers', rate: 5, category: 'Transport' },
  { code: '996521', description: 'Railway transport — goods', rate: 5, category: 'Transport' },
  { code: '996531', description: 'Sea transport — goods', rate: 5, category: 'Transport' },
  { code: '996541', description: 'Air transport — passengers', rate: 5, category: 'Transport' },
  { code: '996601', description: 'Courier services', rate: 18, category: 'Transport' },
  { code: '996602', description: 'Postal services', rate: 18, category: 'Transport' },
  { code: '996711', description: 'Cargo handling services', rate: 18, category: 'Transport' },
  { code: '996721', description: 'Warehousing and storage', rate: 18, category: 'Transport' },

  // ═══════════════════════════════════════════
  // HEALTH & MEDICAL (SAC)
  // ═══════════════════════════════════════════
  { code: '999311', description: 'Hospital medical services', rate: 0, category: 'Healthcare' },
  { code: '999312', description: 'Medical and dental services', rate: 0, category: 'Healthcare' },
  { code: '999319', description: 'Other health services', rate: 18, category: 'Healthcare' },
  { code: '999321', description: 'Residential care for elderly', rate: 0, category: 'Healthcare' },
  { code: '3004', description: 'Medicaments / medicines', rate: 12, category: 'Healthcare' },
  { code: '3005', description: 'Bandages, dressings, surgical items', rate: 12, category: 'Healthcare' },
  { code: '3006', description: 'Pharmaceutical goods (contraceptives)', rate: 0, category: 'Healthcare' },
  { code: '9018', description: 'Medical instruments and apparatus', rate: 12, category: 'Healthcare' },
  { code: '9019', description: 'Massage apparatus, oxygen equipment', rate: 18, category: 'Healthcare' },

  // ═══════════════════════════════════════════
  // AUTOMOBILE & SPARE PARTS (HSN)
  // ═══════════════════════════════════════════
  { code: '8703', description: 'Motor cars / vehicles (passenger)', rate: 28, category: 'Automobile' },
  { code: '8704', description: 'Motor vehicles (goods transport)', rate: 28, category: 'Automobile' },
  { code: '8711', description: 'Motorcycles, scooters', rate: 28, category: 'Automobile' },
  { code: '8712', description: 'Bicycles and cycles', rate: 12, category: 'Automobile' },
  { code: '8708', description: 'Motor vehicle parts & accessories', rate: 28, category: 'Automobile' },
  { code: '4011', description: 'Rubber tyres (new)', rate: 28, category: 'Automobile' },
  { code: '2710', description: 'Petroleum oils, fuel, diesel', rate: 18, category: 'Automobile' },
  { code: '2711', description: 'LPG, natural gas', rate: 5, category: 'Automobile' },

  // ═══════════════════════════════════════════
  // STATIONERY & OFFICE SUPPLIES (HSN)
  // ═══════════════════════════════════════════
  { code: '4802', description: 'Paper (uncoated, writing/printing)', rate: 12, category: 'Stationery' },
  { code: '4811', description: 'Paper (coated, laminated)', rate: 18, category: 'Stationery' },
  { code: '4817', description: 'Envelopes, letter cards', rate: 18, category: 'Stationery' },
  { code: '4820', description: 'Notebooks, diaries, registers', rate: 12, category: 'Stationery' },
  { code: '9608', description: 'Ball pens, markers, crayons', rate: 18, category: 'Stationery' },
  { code: '9610', description: 'Slates, whiteboards, blackboards', rate: 18, category: 'Stationery' },

  // ═══════════════════════════════════════════
  // COSMETICS & PERSONAL CARE (HSN)
  // ═══════════════════════════════════════════
  { code: '3301', description: 'Essential oils', rate: 18, category: 'Personal Care' },
  { code: '3303', description: 'Perfumes and toilet waters', rate: 28, category: 'Personal Care' },
  { code: '3304', description: 'Beauty / makeup preparations', rate: 28, category: 'Personal Care' },
  { code: '3305', description: 'Hair care preparations (shampoo, oil)', rate: 18, category: 'Personal Care' },
  { code: '3306', description: 'Oral hygiene (toothpaste)', rate: 18, category: 'Personal Care' },
  { code: '3307', description: 'Deodorants, room fragrances', rate: 28, category: 'Personal Care' },
  { code: '3401', description: 'Soap and washing preparations', rate: 18, category: 'Personal Care' },
  { code: '3402', description: 'Detergents and cleaning agents', rate: 18, category: 'Personal Care' },

  // ═══════════════════════════════════════════
  // HOSPITALITY (SAC)
  // ═══════════════════════════════════════════
  { code: '996311', description: 'Room / accommodation (tariff < ₹1000)', rate: 0, category: 'Hospitality' },
  { code: '996312', description: 'Room / accommodation (₹1000-₹7500)', rate: 12, category: 'Hospitality' },
  { code: '996313', description: 'Room / accommodation (> ₹7500)', rate: 18, category: 'Hospitality' },
  { code: '996331', description: 'Catering services', rate: 5, category: 'Hospitality' },
  { code: '996332', description: 'Restaurant services (non-AC)', rate: 5, category: 'Hospitality' },
  { code: '996333', description: 'Restaurant services (AC / luxury)', rate: 5, category: 'Hospitality' },
  { code: '996334', description: 'Outdoor catering services', rate: 18, category: 'Hospitality' },

  // ═══════════════════════════════════════════
  // FINANCIAL SERVICES (SAC)
  // ═══════════════════════════════════════════
  { code: '997111', description: 'Central banking services', rate: 18, category: 'Financial' },
  { code: '997112', description: 'Deposit services (savings, current)', rate: 18, category: 'Financial' },
  { code: '997113', description: 'Credit/lending services (loans)', rate: 18, category: 'Financial' },
  { code: '997119', description: 'Other financial services', rate: 18, category: 'Financial' },
  { code: '997131', description: 'Financial leasing services', rate: 18, category: 'Financial' },
  { code: '997132', description: 'Life insurance services', rate: 18, category: 'Financial' },
  { code: '997133', description: 'General insurance services', rate: 18, category: 'Financial' },
  { code: '997134', description: 'Reinsurance services', rate: 18, category: 'Financial' },
  { code: '997151', description: 'Stock broking services', rate: 18, category: 'Financial' },
  { code: '997152', description: 'Commodity broking services', rate: 18, category: 'Financial' },
  { code: '997153', description: 'Fund management services', rate: 18, category: 'Financial' },
  { code: '997159', description: 'Other financial market services', rate: 18, category: 'Financial' },

  // ═══════════════════════════════════════════
  // REAL ESTATE (SAC)
  // ═══════════════════════════════════════════
  { code: '997211', description: 'Rental of residential property', rate: 0, category: 'Real Estate' },
  { code: '997212', description: 'Rental of commercial property', rate: 18, category: 'Real Estate' },
  { code: '997221', description: 'Real estate services on a fee basis', rate: 18, category: 'Real Estate' },

  // ═══════════════════════════════════════════
  // JEWELLERY & PRECIOUS METALS (HSN)
  // ═══════════════════════════════════════════
  { code: '7101', description: 'Pearls (natural or cultured)', rate: 3, category: 'Jewellery' },
  { code: '7102', description: 'Diamonds (unworked/cut)', rate: 0.25, category: 'Jewellery' },
  { code: '7103', description: 'Precious stones (ruby, sapphire)', rate: 3, category: 'Jewellery' },
  { code: '7106', description: 'Silver (unwrought, bars, coins)', rate: 3, category: 'Jewellery' },
  { code: '7108', description: 'Gold (unwrought, bars, coins)', rate: 3, category: 'Jewellery' },
  { code: '7113', description: 'Jewellery (gold, silver)', rate: 3, category: 'Jewellery' },
  { code: '7117', description: 'Imitation jewellery', rate: 18, category: 'Jewellery' },

  // ═══════════════════════════════════════════
  // ENTERTAINMENT & MEDIA (SAC)
  // ═══════════════════════════════════════════
  { code: '999611', description: 'Motion picture production services', rate: 18, category: 'Entertainment' },
  { code: '999612', description: 'Motion picture distribution', rate: 18, category: 'Entertainment' },
  { code: '999613', description: 'Motion picture projection (cinema)', rate: 18, category: 'Entertainment' },
  { code: '999621', description: 'Radio/TV program production', rate: 18, category: 'Entertainment' },
  { code: '999631', description: 'Music publishing services', rate: 18, category: 'Entertainment' },
  { code: '999692', description: 'Amusement park and similar', rate: 18, category: 'Entertainment' },
  { code: '999694', description: 'Sporting event organization', rate: 18, category: 'Entertainment' },

  // ═══════════════════════════════════════════
  // MISCELLANEOUS GOODS (HSN)
  // ═══════════════════════════════════════════
  { code: '3808', description: 'Insecticides, fungicides, herbicides', rate: 18, category: 'Chemicals' },
  { code: '3809', description: 'Finishing agents (textile/paper)', rate: 18, category: 'Chemicals' },
  { code: '3901', description: 'Polymers (polyethylene)', rate: 18, category: 'Chemicals' },
  { code: '3923', description: 'Plastic bottles, containers', rate: 18, category: 'Chemicals' },
  { code: '3926', description: 'Other plastic articles', rate: 18, category: 'Chemicals' },
  { code: '6910', description: 'Ceramic sinks, washbasins, toilets', rate: 18, category: 'Construction' },
  { code: '6911', description: 'Ceramic tableware, kitchenware', rate: 12, category: 'Household' },
  { code: '7010', description: 'Glass bottles and jars', rate: 18, category: 'Household' },
  { code: '7013', description: 'Glassware (tableware)', rate: 18, category: 'Household' },
  { code: '7210', description: 'Steel coils/sheets (coated)', rate: 18, category: 'Metals' },
  { code: '7304', description: 'Steel pipes and tubes', rate: 18, category: 'Metals' },
  { code: '7306', description: 'Iron/steel tubes (welded)', rate: 18, category: 'Metals' },
  { code: '7318', description: 'Screws, bolts, nuts, washers', rate: 18, category: 'Metals' },
  { code: '7323', description: 'Steel utensils (kitchen)', rate: 18, category: 'Household' },
  { code: '7612', description: 'Aluminium containers, cans', rate: 18, category: 'Metals' },
  { code: '8414', description: 'Air pumps, compressors, fans', rate: 18, category: 'Machinery' },
  { code: '8415', description: 'Air conditioning machines', rate: 28, category: 'Electronics' },
  { code: '8418', description: 'Refrigerators, freezers', rate: 18, category: 'Electronics' },
  { code: '8422', description: 'Dishwashing machines', rate: 18, category: 'Electronics' },
  { code: '8433', description: 'Harvesting machinery', rate: 12, category: 'Machinery' },
  { code: '8450', description: 'Washing machines', rate: 18, category: 'Electronics' },
  { code: '8508', description: 'Vacuum cleaners', rate: 28, category: 'Electronics' },
  { code: '8516', description: 'Electric water heaters, iron', rate: 18, category: 'Electronics' },
  { code: '8539', description: 'LED lamps and tube lights', rate: 12, category: 'Electronics' },
];

// ═══════════════════════════════════════════
// SYNONYM MAPPING — Maps common English & Hindi/Hinglish terms to keywords
// ═══════════════════════════════════════════
const SYNONYMS = {
  // Furniture
  'chair': ['seats', 'chairs', 'furniture', 'office'],
  'kursi': ['seats', 'chairs', 'furniture'],
  'table': ['desks', 'tables', 'furniture', 'cabinets'],
  'mez': ['desks', 'tables', 'furniture'],
  'desk': ['desks', 'tables', 'furniture'],
  'sofa': ['seats', 'furniture'],
  'palang': ['mattresses', 'furniture', 'bed'],
  'bed': ['mattresses', 'cushions', 'pillows'],
  'mattress': ['mattresses', 'cushions'],
  'gadda': ['mattresses', 'cushions'],
  
  // Electronics
  'phone': ['mobile', 'smartphones', 'phones'],
  'mobile': ['phones', 'smartphones', 'mobile'],
  'smartphone': ['phones', 'smartphones', 'mobile'],
  'laptop': ['laptops', 'computers', 'data processing'],
  'computer': ['laptops', 'computers', 'data processing'],
  'pc': ['laptops', 'computers', 'data processing'],
  'monitor': ['monitors', 'display', 'tvs'],
  'tv': ['tvs', 'monitors', 'projectors'],
  'television': ['tvs', 'monitors'],
  'ac': ['air conditioning'],
  'cooler': ['air conditioning', 'fans'],
  'fridge': ['refrigerators', 'freezers'],
  'refrigerator': ['refrigerators', 'freezers'],
  'printer': ['printers', 'scanners'],
  'camera': ['cctv', 'cameras', 'webcams'],
  'headphone': ['headphones', 'speakers', 'microphones'],
  'earphone': ['headphones', 'speakers'],
  'speaker': ['speakers', 'headphones', 'microphones'],
  'led': ['led lamps', 'tube lights'],
  'bulb': ['led lamps', 'tube lights', 'light fittings'],
  'light': ['lamps', 'light fittings', 'led'],
  'batti': ['lamps', 'light fittings', 'led'],
  'fan': ['fans', 'air pumps'],
  'pankha': ['fans', 'air pumps'],
  'charger': ['chargers', 'power adapters', 'ups'],
  'ups': ['ups', 'power adapters', 'chargers'],
  'washing': ['washing machines', 'washing'],
  'machine': ['machinery', 'machines'],
  'usb': ['usb drives', 'storage media'],
  'pendrive': ['usb drives', 'storage media'],

  // Stationery
  'pen': ['pens', 'markers', 'crayons', 'ball'],
  'pencil': ['pens', 'markers', 'stationery'],
  'kalam': ['pens', 'markers', 'stationery'],
  'notebook': ['notebooks', 'diaries', 'registers'],
  'diary': ['diaries', 'notebooks'],
  'copy': ['notebooks', 'registers'],
  'kitab': ['books', 'printing', 'paper'],
  'paper': ['paper', 'stationery'],
  'kagaz': ['paper', 'stationery'],
  
  // Vehicles & Parts
  'car': ['motor cars', 'vehicles', 'passenger'],
  'gaadi': ['motor cars', 'vehicles', 'motorcycles'],
  'bike': ['motorcycles', 'scooters'],
  'scooter': ['motorcycles', 'scooters'],
  'cycle': ['bicycles', 'cycles'],
  'tyre': ['tyres', 'rubber'],
  'tire': ['tyres', 'rubber'],
  'petrol': ['petroleum', 'fuel', 'diesel'],
  'diesel': ['petroleum', 'fuel', 'diesel'],
  'tel': ['petroleum', 'fuel', 'oil'],
  
  // Clothing & Jewellery
  'gold': ['gold', 'jewellery'],
  'sona': ['gold', 'jewellery'],
  'silver': ['silver', 'jewellery'],
  'chandi': ['silver', 'jewellery'],
  'diamond': ['diamonds', 'precious stones'],
  'heera': ['diamonds', 'precious stones'],
  'ring': ['jewellery', 'gold', 'silver'],
  'anguthi': ['jewellery', 'gold', 'silver'],
  'necklace': ['jewellery', 'gold', 'silver'],
  'shirt': ['shirts', 'blouses'],
  'kameez': ['shirts', 'blouses', 'suits'],
  'tshirt': ['t-shirts', 'singlets', 'tank tops'],
  't-shirt': ['t-shirts', 'singlets', 'tank tops'],
  'jeans': ['trousers', 'suits'],
  'trouser': ['trousers', 'suits'],
  'pant': ['trousers', 'suits'],
  'dress': ['dresses', 'suits'],
  'kapda': ['fabrics', 'woven', 'cotton', 'clothing'],
  'cloth': ['fabrics', 'woven', 'cotton'],
  'jacket': ['jackets', 'overcoats'],
  'sweater': ['sweaters', 'cardigans', 'pullovers'],
  'joota': ['footwear', 'shoes'],
  'shoes': ['footwear', 'shoes'],

  // Medical & Healthcare
  'medicine': ['medicaments', 'medicines', 'pharmaceutical'],
  'dawai': ['medicaments', 'medicines', 'pharmaceutical'],
  'tablet': ['medicaments', 'medicines'],
  'pill': ['medicaments', 'medicines'],
  'drug': ['medicaments', 'medicines', 'pharmaceutical'],
  'hospital': ['hospital', 'medical', 'health'],
  'clinic': ['medical', 'dental', 'health'],
  
  // Personal Care
  'soap': ['soap', 'washing'],
  'sabun': ['soap', 'washing'],
  'shampoo': ['hair care', 'shampoo'],
  'perfume': ['perfumes', 'toilet waters'],
  'ittar': ['perfumes', 'toilet waters'],
  'makeup': ['beauty', 'makeup'],
  'cream': ['beauty', 'makeup', 'cream'],
  'toothpaste': ['oral hygiene', 'toothpaste'],
  'manjan': ['oral hygiene', 'toothpaste'],
  
  // Food & Groceries
  'water': ['mineral water', 'drinking water', 'packaged'],
  'pani': ['mineral water', 'drinking water', 'packaged'],
  'juice': ['fruit juices', 'packaged'],
  'tea': ['tea', 'green', 'black'],
  'chai': ['tea', 'green', 'black'],
  'coffee': ['coffee', 'beans'],
  'rice': ['rice', 'basmati'],
  'chawal': ['rice', 'basmati'],
  'wheat': ['wheat', 'flour', 'atta'],
  'gehu': ['wheat', 'flour'],
  'atta': ['wheat flour', 'atta'],
  'sugar': ['sugar', 'cane', 'beet'],
  'chini': ['sugar', 'cane', 'beet'],
  'shakkar': ['sugar', 'cane', 'beet'],
  'oil': ['oil', 'soyabean', 'sunflower'],
  'milk': ['milk', 'cream'],
  'doodh': ['milk', 'cream'],
  'bread': ['bread', 'biscuits', 'pastry'],
  'biscuit': ['biscuits', 'bread', 'pastry'],
  'chocolate': ['confectionery', 'chocolates'],
  'mithai': ['confectionery', 'sweets'],
  'coke': ['aerated drinks', 'soft drinks'],
  'pepsi': ['aerated drinks', 'soft drinks'],
  'soda': ['aerated drinks', 'soft drinks'],
  'colddrink': ['aerated drinks', 'soft drinks'],
  
  // Services
  'courier': ['courier services'],
  'delivery': ['courier services', 'transport', 'goods'],
  'transport': ['transport', 'goods', 'passengers'],
  'shipping': ['transport', 'goods', 'sea transport'],
  'rent': ['rental', 'property', 'commercial'],
  'kiraya': ['rental', 'property', 'commercial'],
  'hotel': ['room', 'accommodation', 'hospitality'],
  'restaurant': ['restaurant', 'catering'],
  'food': ['catering', 'restaurant', 'food'],
  'catering': ['catering', 'outdoor'],
  'web': ['website', 'hosting', 'it design', 'development'],
  'website': ['website', 'hosting', 'it design'],
  'hosting': ['website hosting', 'data hosting'],
  'software': ['software', 'licensing', 'saas'],
  'saas': ['saas', 'cloud', 'software', 'subscription'],
  'app': ['software', 'it design', 'development', 'application'],
  'consulting': ['consulting', 'advisory', 'management'],
  'audit': ['auditing', 'financial'],
  'tax': ['tax preparation', 'consulting'],
  'legal': ['legal', 'advisory', 'documentation'],
  'lawyer': ['legal', 'advisory', 'representation'],
  'wakil': ['legal', 'advisory', 'representation'],
  'loan': ['credit', 'lending', 'loans'],
  'karz': ['credit', 'lending', 'loans'],
  'insurance': ['insurance', 'life', 'general'],
  'bima': ['insurance', 'life', 'general'],
  'construction': ['construction', 'buildings', 'highways'],
  'building': ['construction', 'buildings'],
  'plumbing': ['plumbing', 'hvac'],
  'painting': ['painting', 'glazing'],
  'paint': ['painting', 'glazing'],
  'electrical': ['electrical', 'installation'],
  'advertising': ['advertising', 'internet'],
  'marketing': ['advertising', 'market research', 'branding'],
  'design': ['graphic design', 'branding', 'interior design', 'it design'],
  'photo': ['photography', 'videography'],
  'video': ['videography', 'photography', 'video recording'],
  'training': ['training', 'coaching'],
  'coaching': ['training', 'coaching'],
  'tuition': ['education', 'training'],
  'school': ['education', 'primary', 'secondary'],
  'college': ['higher education'],
  
  // Hardware & Materials
  'pipe': ['pipes', 'tubes', 'steel'],
  'wire': ['cables', 'wires', 'connectors'],
  'cable': ['cables', 'wires', 'connectors'],
  'tar': ['cables', 'wires', 'connectors'],
  'screw': ['screws', 'bolts', 'nuts'],
  'bolt': ['bolts', 'screws', 'nuts'],
  'nut': ['bolts', 'screws', 'nuts'],
  'steel': ['steel', 'iron', 'coils', 'sheets'],
  'loha': ['steel', 'iron'],
  'glass': ['glass', 'bottles', 'glassware'],
  'kanch': ['glass', 'glassware'],
  'bottle': ['bottles', 'glass', 'plastic'],
  'plastic': ['plastic', 'bottles', 'containers'],
  'utensil': ['utensils', 'kitchen', 'steel'],
  'bartan': ['utensils', 'kitchen', 'steel'],
  'kitchen': ['utensils', 'kitchen', 'kitchenware']
};

// ═══════════════════════════════════════════
// SEARCH FUNCTION — Enhanced fuzzy match with synonyms
// ═══════════════════════════════════════════
export const searchHSN = (query) => {
  if (!query || query.trim().length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/);

  // Expand query words with synonyms
  const expandedWords = new Set(words);
  words.forEach(word => {
    if (SYNONYMS[word]) {
      SYNONYMS[word].forEach(syn => {
        syn.split(/\s+/).forEach(w => expandedWords.add(w));
      });
    }
  });

  const allSearchWords = [...expandedWords];

  const results = hsnCodes
    .map(item => {
      const desc = item.description.toLowerCase();
      const code = item.code.toLowerCase();
      const cat = item.category.toLowerCase();
      
      let score = 0;
      
      // Exact code match — highest priority
      if (code === normalizedQuery || code.startsWith(normalizedQuery)) {
        score += 100;
      }
      
      // Full query match in description
      if (desc.includes(normalizedQuery)) {
        score += 50;
      }
      
      // Original word-by-word match (higher weight)
      words.forEach(word => {
        if (desc.includes(word)) score += 25;
        if (cat.includes(word)) score += 12;
        if (code.includes(word)) score += 15;
      });

      // Synonym-expanded word match (slightly lower weight)
      allSearchWords.forEach(word => {
        if (!words.includes(word)) { // Only bonus for synonym-expanded words
          if (desc.includes(word)) score += 15;
          if (cat.includes(word)) score += 8;
        }
      });
      
      // Starts with match
      if (desc.startsWith(normalizedQuery)) {
        score += 30;
      }

      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return results;
};

export default hsnCodes;
