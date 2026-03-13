import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Link as LinkIcon, 
  Instagram,
  Play,
  Mail,
  Settings, 
  Bell, 
  ChevronRight, 
  Star, 
  Sparkles, 
  ExternalLink,
  PieChart as PieChartIcon,
  BarChart3,
  ArrowUpRight,
  Menu,
  X,
  Search,
  Plus,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Target,
  Calendar,
  DollarSign,
  Activity,
  Package,
  Users,
  CreditCard,
  Globe,
  Shield,
  Zap,
  Layout,
  FileText,
  Share2,
  Trash2,
  Edit3,
  PlusCircle,
  Filter,
  Download,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  Wallet,
  History,
  Lock,
  Percent,
  Megaphone,
  Globe2,
  Cpu,
  BarChart,
  PieChart,
  LineChart,
  ShieldCheck,
  UserPlus,
  Key,
  Terminal,
  Video
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';
import { Product, ChartData, SourceData, StatsOverview, Sale } from './types';
import { summarizeReviews, generateMoreReviews, generateSEOCaption, generateInstagramBio } from './services/geminiService';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Fone de Ouvido Bluetooth Pro Max',
    price: 189.90,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/1',
    affiliate_link: 'https://shopee.com.br/product/1?smtt=0.0.9',
    commission_rate: 12,
    category: 'Eletrônicos',
    rating: 4.8,
    reviews_count: 1250,
    reviews: ["Excelente qualidade de som.", "Bateria dura muito!"],
    stock: 15
  },
  {
    id: '2',
    title: 'Kit Cozinha Master 12 Peças',
    price: 245.00,
    image_url: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/2',
    affiliate_link: 'https://shopee.com.br/product/2?smtt=0.0.9',
    commission_rate: 10,
    category: 'Cozinha',
    rating: 4.9,
    reviews_count: 850,
    reviews: ["Utensílios de ótima qualidade.", "Design lindo."],
    stock: 3
  },
  {
    id: '3',
    title: 'Smartwatch Ultra Series 9',
    price: 159.00,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/3',
    category: 'Eletrônicos',
    rating: 4.7,
    reviews_count: 3400,
    reviews: ["Muitas funções.", "Melhor custo benefício."],
    stock: 25
  },
  {
    id: '4',
    title: 'Luminária RGB Inteligente',
    price: 89.90,
    image_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/4',
    category: 'Eletrônicos',
    rating: 4.6,
    reviews_count: 520,
    reviews: ["Cores lindas.", "Fácil de configurar."],
    stock: 2
  },
  {
    id: '5',
    title: 'Jogo de Panelas Antiaderente',
    price: 320.00,
    image_url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/5',
    category: 'Cozinha',
    rating: 4.8,
    reviews_count: 1100,
    reviews: ["Não gruda nada.", "Muito resistentes."],
    stock: 8
  },
  {
    id: '6',
    title: 'Teclado Mecânico Gamer RGB',
    price: 210.00,
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/6',
    category: 'Eletrônicos',
    rating: 4.9,
    reviews_count: 890,
    reviews: ["Switches ótimos.", "Iluminação top."],
    stock: 12
  },
  {
    id: '7',
    title: 'Tênis Esportivo Ultra Light',
    price: 129.90,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/7',
    category: 'Moda',
    rating: 4.8,
    reviews_count: 2100,
    reviews: ["Muito leve.", "Confortável para correr."],
    stock: 4
  },
  {
    id: '8',
    title: 'Kit Maquiagem Profissional',
    price: 199.00,
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/8',
    category: 'Beleza',
    rating: 4.9,
    reviews_count: 1500,
    reviews: ["Cores pigmentadas.", "Ótimo custo benefício."],
    stock: 20
  },
  {
    id: '9',
    title: 'Cama Pet Nuvem Extra Macia',
    price: 75.00,
    image_url: 'https://images.unsplash.com/photo-1541599540903-216a46ca1df0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/9',
    category: 'Pet',
    rating: 5.0,
    reviews_count: 450,
    reviews: ["Meu cachorro amou!", "Muito fofinha."],
    stock: 1
  },
  {
    id: '10',
    title: 'Garrafa Térmica Inox 1L',
    price: 59.90,
    image_url: 'https://images.unsplash.com/photo-1602143307185-83e312e44467?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/10',
    category: 'Esportes',
    rating: 4.7,
    reviews_count: 3200,
    reviews: ["Mantém gelado o dia todo.", "Não vaza."],
    stock: 30
  },
  {
    id: '11',
    title: 'Console Portátil Retro 400 Jogos',
    price: 85.00,
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/11',
    category: 'Games',
    rating: 4.5,
    reviews_count: 1200,
    reviews: ["Nostalgia pura.", "Bateria dura bem."],
    stock: 50
  },
  {
    id: '12',
    title: 'Quadro Decorativo Minimalista',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/12',
    category: 'Decoração',
    rating: 4.9,
    reviews_count: 300,
    reviews: ["Lindo na sala.", "Acabamento impecável."],
    stock: 10
  },
  {
    id: '13',
    title: 'Kit Canetas Brush Pen 24 Cores',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/13',
    category: 'Papelaria',
    rating: 4.8,
    reviews_count: 850,
    reviews: ["Cores vibrantes.", "Ponta macia."],
    stock: 100
  },
  {
    id: '14',
    title: 'Suporte Celular para Carro Magnético',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/14',
    category: 'Automotivo',
    rating: 4.6,
    reviews_count: 5000,
    reviews: ["Imã muito forte.", "Não cai."],
    stock: 200
  },
  {
    id: '15',
    title: 'Umidificador de Ar Ultrassônico',
    price: 79.00,
    image_url: 'https://images.unsplash.com/photo-1585771724684-252702b64428?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/15',
    category: 'Saúde',
    rating: 4.7,
    reviews_count: 2100,
    reviews: ["Silencioso.", "Ótimo para dormir."],
    stock: 40
  },
  {
    id: '16',
    title: 'Jogo de Chaves de Fenda 32 em 1',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/16',
    category: 'Ferramentas',
    rating: 4.8,
    reviews_count: 1500,
    reviews: ["Muito completo.", "Boa qualidade."],
    stock: 60
  },
  {
    id: '17',
    title: 'Tapete de Atividades Infantil',
    price: 110.00,
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/17',
    category: 'Infantil',
    rating: 4.9,
    reviews_count: 400,
    reviews: ["Colorido e macio.", "Meu bebê adorou."],
    stock: 15
  },
  {
    id: '18',
    title: 'Livro: Hábitos Atômicos',
    price: 42.00,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/18',
    category: 'Livros',
    rating: 5.0,
    reviews_count: 10000,
    reviews: ["Leitura obrigatória.", "Mudou minha vida."],
    stock: 300
  },
  {
    id: '19',
    title: 'Óculos de Sol Polarizado Classic',
    price: 55.00,
    image_url: 'https://images.unsplash.com/photo-1511499767390-903390e62bc0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/19',
    category: 'Acessórios',
    rating: 4.7,
    reviews_count: 2500,
    reviews: ["Lentes ótimas.", "Estiloso."],
    stock: 80
  },
  {
    id: '20',
    title: 'Adaptador USB-C Hub 7 em 1',
    price: 145.00,
    image_url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/20',
    category: 'Tecnologia',
    rating: 4.8,
    reviews_count: 950,
    reviews: ["Funciona perfeitamente.", "Compacto."],
    stock: 25
  },
  {
    id: '21',
    title: 'Mouse Gamer Sem Fio 16000 DPI',
    price: 189.00,
    image_url: 'https://images.unsplash.com/photo-1527698266440-12104e498b76?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/21',
    category: 'Games',
    rating: 4.9,
    reviews_count: 1200,
    reviews: ["Muito preciso.", "Bateria dura muito."],
    stock: 45
  },
  {
    id: '22',
    title: 'Headset Gamer 7.1 Surround',
    price: 250.00,
    image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/22',
    category: 'Games',
    rating: 4.8,
    reviews_count: 800,
    reviews: ["Som incrível.", "Muito confortável."],
    stock: 30
  },
  {
    id: '23',
    title: 'Vaso de Cerâmica Boho',
    price: 68.00,
    image_url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/23',
    category: 'Decoração',
    rating: 4.7,
    reviews_count: 450,
    reviews: ["Fica lindo na estante.", "Bem embalado."],
    stock: 20
  },
  {
    id: '24',
    title: 'Luminária de Mesa Industrial',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/24',
    category: 'Decoração',
    rating: 4.9,
    reviews_count: 150,
    reviews: ["Estilo retrô muito legal.", "Luz aconchegante."],
    stock: 12
  },
  {
    id: '25',
    title: 'Caderno Inteligente A5',
    price: 89.90,
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/25',
    category: 'Papelaria',
    rating: 4.9,
    reviews_count: 2200,
    reviews: ["Melhor compra do ano.", "Muito prático."],
    stock: 150
  },
  {
    id: '26',
    title: 'Estojo Organizador Grande',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/26',
    category: 'Papelaria',
    rating: 4.7,
    reviews_count: 3100,
    reviews: ["Cabe tudo!", "Material resistente."],
    stock: 80
  },
  {
    id: '27',
    title: 'Aspirador de Pó Automotivo 12V',
    price: 95.00,
    image_url: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/27',
    category: 'Automotivo',
    rating: 4.5,
    reviews_count: 1800,
    reviews: ["Potente para o tamanho.", "Cabo longo."],
    stock: 55
  },
  {
    id: '28',
    title: 'Organizador de Porta-Malas',
    price: 49.00,
    image_url: 'https://images.unsplash.com/photo-1506610154367-e297c1760300?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/28',
    category: 'Automotivo',
    rating: 4.8,
    reviews_count: 900,
    reviews: ["Acabou a bagunça.", "Muito útil."],
    stock: 110
  },
  {
    id: '29',
    title: 'Massageador Cervical Elétrico',
    price: 135.00,
    image_url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/29',
    category: 'Saúde',
    rating: 4.6,
    reviews_count: 1400,
    reviews: ["Relaxa bastante.", "Fácil de usar."],
    stock: 35
  },
  {
    id: '30',
    title: 'Oxímetro de Pulso Digital',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/30',
    category: 'Saúde',
    rating: 4.9,
    reviews_count: 5000,
    reviews: ["Preciso e rápido.", "Essencial."],
    stock: 200
  },
  {
    id: '31',
    title: 'Parafusadeira Sem Fio 12V',
    price: 199.00,
    image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/31',
    category: 'Ferramentas',
    rating: 4.8,
    reviews_count: 750,
    reviews: ["Bateria dura bem.", "Forte."],
    stock: 25
  },
  {
    id: '32',
    title: 'Nível Laser Profissional',
    price: 155.00,
    image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/32',
    category: 'Ferramentas',
    rating: 4.7,
    reviews_count: 320,
    reviews: ["Muito preciso.", "Facilita o trabalho."],
    stock: 18
  },
  {
    id: '33',
    title: 'Blocos de Montar Educativo',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/33',
    category: 'Infantil',
    rating: 5.0,
    reviews_count: 1100,
    reviews: ["Ótimo para o desenvolvimento.", "Peças seguras."],
    stock: 45
  },
  {
    id: '34',
    title: 'Projetor de Estrelas Galáxia',
    price: 125.00,
    image_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/34',
    category: 'Infantil',
    rating: 4.8,
    reviews_count: 2500,
    reviews: ["Lindo no quarto.", "As crianças amam."],
    stock: 60
  },
  {
    id: '35',
    title: 'Livro: O Poder da Autorresponsabilidade',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/35',
    category: 'Livros',
    rating: 4.9,
    reviews_count: 8500,
    reviews: ["Impactante.", "Direto ao ponto."],
    stock: 400
  },
  {
    id: '36',
    title: 'Kindle 11ª Geração',
    price: 499.00,
    image_url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/36',
    category: 'Livros',
    rating: 5.0,
    reviews_count: 15000,
    reviews: ["Melhor investimento.", "Bateria eterna."],
    stock: 50
  },
  {
    id: '37',
    title: 'Relógio Digital Minimalista',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/37',
    category: 'Acessórios',
    rating: 4.6,
    reviews_count: 4200,
    reviews: ["Simples e bonito.", "Combina com tudo."],
    stock: 120
  },
  {
    id: '38',
    title: 'Carteira de Couro Slim',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/38',
    category: 'Acessórios',
    rating: 4.8,
    reviews_count: 2800,
    reviews: ["Muito fina.", "Couro de verdade."],
    stock: 95
  },
  {
    id: '39',
    title: 'Power Bank 20000mAh Fast Charge',
    price: 159.00,
    image_url: 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/39',
    category: 'Tecnologia',
    rating: 4.9,
    reviews_count: 3500,
    reviews: ["Carga muito rápida.", "Pesado mas potente."],
    stock: 40
  },
  {
    id: '40',
    title: 'Fone de Ouvido Noise Cancelling',
    price: 350.00,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/40',
    category: 'Tecnologia',
    rating: 4.8,
    reviews_count: 1100,
    reviews: ["Isolamento perfeito.", "Som cristalino."],
    stock: 15
  },
  {
    id: '41',
    title: 'Arranhador para Gatos 3 Níveis',
    price: 185.00,
    image_url: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/41',
    category: 'Pet',
    rating: 4.9,
    reviews_count: 600,
    reviews: ["Meus gatos amaram.", "Bem estável."],
    stock: 10
  },
  {
    id: '42',
    title: 'Bebedouro Fonte para Gatos',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/42',
    category: 'Pet',
    rating: 4.7,
    reviews_count: 1200,
    reviews: ["Silencioso.", "Estimula a beber água."],
    stock: 25
  },
  {
    id: '43',
    title: 'Jaqueta Puffer Masculina',
    price: 159.00,
    image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/43',
    category: 'Moda',
    rating: 4.8,
    reviews_count: 950,
    reviews: ["Muito quente.", "Ótimo acabamento."],
    stock: 30
  },
  {
    id: '44',
    title: 'Bolsa Feminina Transversal',
    price: 79.00,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/44',
    category: 'Moda',
    rating: 4.7,
    reviews_count: 2100,
    reviews: ["Linda e prática.", "Tamanho ideal."],
    stock: 50
  },
  {
    id: '45',
    title: 'Kit de Pincéis de Maquiagem 12un',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfad450216?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/45',
    category: 'Beleza',
    rating: 4.8,
    reviews_count: 3500,
    reviews: ["Cerdas macias.", "Não solta pelo."],
    stock: 100
  },
  {
    id: '46',
    title: 'Sérum Facial Vitamina C',
    price: 59.00,
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/46',
    category: 'Beleza',
    rating: 4.9,
    reviews_count: 5200,
    reviews: ["Pele radiante.", "Cheiro maravilhoso."],
    stock: 75
  },
  {
    id: '47',
    title: 'Tapete de Yoga Antiderrapante',
    price: 85.00,
    image_url: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/47',
    category: 'Esportes',
    rating: 4.8,
    reviews_count: 1100,
    reviews: ["Boa espessura.", "Não escorrega."],
    stock: 40
  },
  {
    id: '48',
    title: 'Corda de Pular com Contador',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1598289431512-b97b0917a63e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/48',
    category: 'Esportes',
    rating: 4.6,
    reviews_count: 2500,
    reviews: ["Ótimo para cardio.", "Contador ajuda muito."],
    stock: 120
  },
  {
    id: '49',
    title: 'Air Fryer Digital 4L',
    price: 399.00,
    image_url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/49',
    category: 'Cozinha',
    rating: 4.9,
    reviews_count: 8500,
    reviews: ["Melhor invenção.", "Muito fácil de limpar."],
    stock: 20
  },
  {
    id: '50',
    title: 'Balança de Cozinha Digital',
    price: 29.00,
    image_url: 'https://images.unsplash.com/photo-1590373576350-3747056845e7?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/50',
    category: 'Cozinha',
    rating: 4.8,
    reviews_count: 12000,
    reviews: ["Precisa.", "Barata e funcional."],
    stock: 300
  },
  {
    id: '51',
    title: 'Fone Bluetooth i12 TWS',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/51',
    category: 'Eletrônicos',
    rating: 4.4,
    reviews_count: 25000,
    reviews: ["Pelo preço é ótimo.", "Entrega rápida."],
    stock: 1000
  },
  {
    id: '52',
    title: 'Cabo iPhone Lightning Reforçado',
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/52',
    category: 'Eletrônicos',
    rating: 4.7,
    reviews_count: 15000,
    reviews: ["Carrega rápido.", "Bem resistente."],
    stock: 500
  },
  {
    id: '53',
    title: 'Camiseta Básica Algodão Premium',
    price: 39.90,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/53',
    category: 'Moda',
    rating: 4.8,
    reviews_count: 4500,
    reviews: ["Tecido muito bom.", "Veste bem."],
    stock: 200
  },
  {
    id: '54',
    title: 'Meias Esportivas Kit 12 Pares',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1582966298430-6174c22ad0c7?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/54',
    category: 'Moda',
    rating: 4.7,
    reviews_count: 8000,
    reviews: ["Confortáveis.", "Ótimo preço."],
    stock: 150
  },
  {
    id: '55',
    title: 'Batom Matte Longa Duração',
    price: 19.90,
    image_url: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/55',
    category: 'Beleza',
    rating: 4.8,
    reviews_count: 6200,
    reviews: ["Cor linda.", "Não sai fácil."],
    stock: 300
  },
  {
    id: '56',
    title: 'Máscara de Cílios 4D',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1591360236630-44924d04fba1?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/56',
    category: 'Beleza',
    rating: 4.7,
    reviews_count: 4100,
    reviews: ["Volume incrível.", "Amei."],
    stock: 180
  },
  {
    id: '57',
    title: 'Coleira Peitoral com Guia',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1591768793355-74d7af236c1f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/57',
    category: 'Pet',
    rating: 4.8,
    reviews_count: 2200,
    reviews: ["Segura e bonita.", "Fácil de ajustar."],
    stock: 90
  },
  {
    id: '58',
    title: 'Brinquedo Interativo para Cães',
    price: 29.00,
    image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/58',
    category: 'Pet',
    rating: 4.9,
    reviews_count: 1500,
    reviews: ["Dura muito.", "Meu pet não larga."],
    stock: 120
  },
  {
    id: '59',
    title: 'Joelheira de Compressão',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/59',
    category: 'Esportes',
    rating: 4.7,
    reviews_count: 3800,
    reviews: ["Ajuda muito na dor.", "Boa qualidade."],
    stock: 200
  },
  {
    id: '60',
    title: 'Kit Elásticos Extensores',
    price: 55.00,
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/60',
    category: 'Esportes',
    rating: 4.8,
    reviews_count: 2100,
    reviews: ["Dá pra treinar tudo.", "Resistentes."],
    stock: 85
  },
  {
    id: '61',
    title: 'Controle DualShock 4 (Replica)',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1592840331052-16e15c2c6f95?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/61',
    category: 'Games',
    rating: 4.5,
    reviews_count: 5200,
    reviews: ["Funciona bem no PC.", "Ótimo custo."],
    stock: 150
  },
  {
    id: '62',
    title: 'Mousepad Gamer Extra Grande',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1616533151339-98a45cfb333e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/62',
    category: 'Games',
    rating: 4.9,
    reviews_count: 3100,
    reviews: ["Desliza muito bem.", "Enorme."],
    stock: 200
  },
  {
    id: '63',
    title: 'Fita LED RGB 5M com Controle',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/63',
    category: 'Decoração',
    rating: 4.7,
    reviews_count: 12000,
    reviews: ["Quarto ficou top.", "Fácil instalar."],
    stock: 500
  },
  {
    id: '64',
    title: 'Mini Projetor Portátil Led',
    price: 280.00,
    image_url: 'https://images.unsplash.com/photo-1535016120720-40c646bebbfc?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/64',
    category: 'Decoração',
    rating: 4.4,
    reviews_count: 800,
    reviews: ["Cinema em casa.", "Imagem boa no escuro."],
    stock: 30
  },
  {
    id: '65',
    title: 'Kit Marcadores de Texto Pastel',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/65',
    category: 'Papelaria',
    rating: 4.9,
    reviews_count: 4500,
    reviews: ["Cores lindas.", "Não passa pra trás."],
    stock: 400
  },
  {
    id: '66',
    title: 'Washi Tapes Decorativas Kit 10',
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/66',
    category: 'Papelaria',
    rating: 4.8,
    reviews_count: 1200,
    reviews: ["Muito fofas.", "Boa aderência."],
    stock: 250
  },
  {
    id: '67',
    title: 'Câmera de Ré com Visão Noturna',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1506610154367-e297c1760300?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/67',
    category: 'Automotivo',
    rating: 4.6,
    reviews_count: 900,
    reviews: ["Ajuda muito estacionar.", "Imagem clara."],
    stock: 70
  },
  {
    id: '68',
    title: 'Transmissor FM Bluetooth Carro',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/68',
    category: 'Automotivo',
    rating: 4.7,
    reviews_count: 5200,
    reviews: ["Som limpo.", "Conecta rápido."],
    stock: 180
  },
  {
    id: '69',
    title: 'Termômetro Digital Infravermelho',
    price: 55.00,
    image_url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/69',
    category: 'Saúde',
    rating: 4.9,
    reviews_count: 8500,
    reviews: ["Muito rápido.", "Indispensável."],
    stock: 150
  },
  {
    id: '70',
    title: 'Medidor de Pressão Arterial',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/70',
    category: 'Saúde',
    rating: 4.8,
    reviews_count: 3100,
    reviews: ["Fácil de usar sozinho.", "Preciso."],
    stock: 65
  },
  {
    id: '71',
    title: 'Lanterna Tática LED Potente',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/71',
    category: 'Ferramentas',
    rating: 4.7,
    reviews_count: 2200,
    reviews: ["Ilumina muito.", "Bateria dura."],
    stock: 110
  },
  {
    id: '72',
    title: 'Paquímetro Digital Inox',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/72',
    category: 'Ferramentas',
    rating: 4.8,
    reviews_count: 600,
    reviews: ["Excelente precisão.", "Material bom."],
    stock: 40
  },
  {
    id: '73',
    title: 'Mordedor de Silicone para Bebê',
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/73',
    category: 'Infantil',
    rating: 4.9,
    reviews_count: 3500,
    reviews: ["Macio.", "Fácil de segurar."],
    stock: 300
  },
  {
    id: '74',
    title: 'Luminária Tartaruga Projetora',
    price: 75.00,
    image_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/74',
    category: 'Infantil',
    rating: 4.7,
    reviews_count: 1800,
    reviews: ["Linda.", "Ajuda a dormir."],
    stock: 85
  },
  {
    id: '75',
    title: 'Livro: Pai Rico, Pai Pobre',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/75',
    category: 'Livros',
    rating: 4.9,
    reviews_count: 25000,
    reviews: ["Clássico.", "Abre a mente."],
    stock: 500
  },
  {
    id: '76',
    title: 'Livro: A Psicologia Financeira',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/76',
    category: 'Livros',
    rating: 5.0,
    reviews_count: 12000,
    reviews: ["Excelente leitura.", "Muito prático."],
    stock: 200
  },
  {
    id: '77',
    title: 'Corrente Masculina Banhada Ouro',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1511499767390-903390e62bc0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/77',
    category: 'Acessórios',
    rating: 4.7,
    reviews_count: 1500,
    reviews: ["Brilho ótimo.", "Parece ouro real."],
    stock: 60
  },
  {
    id: '78',
    title: 'Brinco de Prata 925 Argola',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/78',
    category: 'Acessórios',
    rating: 4.8,
    reviews_count: 2100,
    reviews: ["Delicado.", "Prata de verdade."],
    stock: 110
  },
  {
    id: '79',
    title: 'Suporte Articulado para Monitor',
    price: 189.00,
    image_url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/79',
    category: 'Tecnologia',
    rating: 4.9,
    reviews_count: 800,
    reviews: ["Muito firme.", "Ganhei muito espaço."],
    stock: 35
  },
  {
    id: '80',
    title: 'Webcam 1080p Full HD',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/80',
    category: 'Tecnologia',
    rating: 4.7,
    reviews_count: 2500,
    reviews: ["Imagem nítida.", "Microfone bom."],
    stock: 90
  },
  {
    id: '81',
    title: 'Smart TV Stick 4K',
    price: 199.00,
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/81',
    category: 'Eletrônicos',
    rating: 4.9,
    reviews_count: 12000,
    reviews: ["Transformou minha TV.", "Muito rápido."],
    stock: 45
  },
  {
    id: '82',
    title: 'Mini Teclado Wireless com Touchpad',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/82',
    category: 'Eletrônicos',
    rating: 4.6,
    reviews_count: 3500,
    reviews: ["Ótimo para TV Box.", "Pequeno e funcional."],
    stock: 120
  },
  {
    id: '83',
    title: 'Kit Organizador de Cabos 10un',
    price: 12.00,
    image_url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/83',
    category: 'Tecnologia',
    rating: 4.8,
    reviews_count: 5000,
    reviews: ["Mesa ficou limpa.", "Simples e resolve."],
    stock: 1000
  },
  {
    id: '84',
    title: 'Suporte Notebook Ajustável Alumínio',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/84',
    category: 'Tecnologia',
    rating: 4.9,
    reviews_count: 2100,
    reviews: ["Muito estável.", "Melhorou minha postura."],
    stock: 80
  },
  {
    id: '85',
    title: 'Mochila Antifurto com Saída USB',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/85',
    category: 'Moda',
    rating: 4.7,
    reviews_count: 4200,
    reviews: ["Segura e bonita.", "Espaçosa."],
    stock: 150
  },
  {
    id: '86',
    title: 'Relógio Inteligente Infantil com GPS',
    price: 110.00,
    image_url: 'https://images.unsplash.com/photo-1508685096489-7aac29625a3b?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/86',
    category: 'Infantil',
    rating: 4.5,
    reviews_count: 1200,
    reviews: ["Dá mais segurança.", "Meu filho amou."],
    stock: 40
  },
  {
    id: '87',
    title: 'Kit 10 Pares de Cílios Postiços',
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1583001931046-f98c9f3ae4b1?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/87',
    category: 'Beleza',
    rating: 4.8,
    reviews_count: 9500,
    reviews: ["Parecem naturais.", "Ótima cola."],
    stock: 500
  },
  {
    id: '88',
    title: 'Luminária de Lua 3D USB',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1532926381893-7542290edf1d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/88',
    category: 'Decoração',
    rating: 4.9,
    reviews_count: 3200,
    reviews: ["Mágica.", "Luz muito suave."],
    stock: 100
  },
  {
    id: '89',
    title: 'Mini Processador de Alimentos USB',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/89',
    category: 'Cozinha',
    rating: 4.7,
    reviews_count: 15000,
    reviews: ["Prático demais.", "Pica alho rapidinho."],
    stock: 600
  },
  {
    id: '90',
    title: 'Garrafa Motivacional 2L Kit 3un',
    price: 49.00,
    image_url: 'https://images.unsplash.com/photo-1523362628744-0c14a394ba87?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/90',
    category: 'Esportes',
    rating: 4.8,
    reviews_count: 22000,
    reviews: ["Cores lindas.", "Ajuda a beber água."],
    stock: 1000
  },
  {
    id: '91',
    title: 'Smartwatch Ultra 2 49mm',
    price: 350.00,
    image_url: 'https://images.unsplash.com/photo-1508685096489-7aac29625a3b?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/91',
    category: 'Eletrônicos',
    rating: 4.9,
    reviews_count: 1500,
    reviews: ["Tela incrível.", "Bateria dura muito."],
    stock: 20
  },
  {
    id: '92',
    title: 'Caixa de Som Bluetooth à Prova D\'água',
    price: 129.00,
    image_url: 'https://images.unsplash.com/photo-1608156639585-34a0a5d73751?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/92',
    category: 'Eletrônicos',
    rating: 4.8,
    reviews_count: 3200,
    reviews: ["Som potente.", "Ótima para piscina."],
    stock: 55
  },
  {
    id: '93',
    title: 'Mixer Portátil Recarregável',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/93',
    category: 'Cozinha',
    rating: 4.7,
    reviews_count: 8500,
    reviews: ["Muito prático para shakes.", "Fácil de lavar."],
    stock: 120
  },
  {
    id: '94',
    title: 'Conjunto de Facas Cerâmica 6 Peças',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1593611664164-5d44730c5992?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/94',
    category: 'Cozinha',
    rating: 4.9,
    reviews_count: 1200,
    reviews: ["Corte perfeito.", "Design lindo."],
    stock: 40
  },
  {
    id: '95',
    title: 'Calça Jogger Masculina Casual',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/95',
    category: 'Moda',
    rating: 4.7,
    reviews_count: 2100,
    reviews: ["Muito confortável.", "Veste muito bem."],
    stock: 85
  },
  {
    id: '96',
    title: 'Vestido Midi Elegante Verão',
    price: 95.00,
    image_url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/96',
    category: 'Moda',
    rating: 4.8,
    reviews_count: 1500,
    reviews: ["Tecido leve.", "Cor idêntica à foto."],
    stock: 60
  },
  {
    id: '97',
    title: 'Paleta de Sombras Nude 18 Cores',
    price: 49.00,
    image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/97',
    category: 'Beleza',
    rating: 4.9,
    reviews_count: 3200,
    reviews: ["Pigmentação excelente.", "Cores versáteis."],
    stock: 150
  },
  {
    id: '98',
    title: 'Kit Skin Care Facial 4 Passos',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/98',
    category: 'Beleza',
    rating: 4.8,
    reviews_count: 1800,
    reviews: ["Minha pele mudou.", "Produtos suaves."],
    stock: 45
  },
  {
    id: '99',
    title: 'Fonte de Água Inox para Gatos',
    price: 110.00,
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/99',
    category: 'Pet',
    rating: 5.0,
    reviews_count: 900,
    reviews: ["Higiênica e silenciosa.", "Gatos adoraram."],
    stock: 30
  },
  {
    id: '100',
    title: 'Tapete Higiênico Lavável Pet',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1541599540903-216a46ca1df0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/100',
    category: 'Pet',
    rating: 4.7,
    reviews_count: 2500,
    reviews: ["Economia pura.", "Fácil de lavar."],
    stock: 200
  },
  {
    id: '101',
    title: 'Kit Faixas Elásticas Mini Band',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/101',
    category: 'Esportes',
    rating: 4.8,
    reviews_count: 5200,
    reviews: ["Ótimas para pernas.", "Várias intensidades."],
    stock: 300
  },
  {
    id: '102',
    title: 'Luva de Academia com Munhequeira',
    price: 29.00,
    image_url: 'https://images.unsplash.com/photo-1583473848861-0b9187ad5622?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/102',
    category: 'Esportes',
    rating: 4.6,
    reviews_count: 1400,
    reviews: ["Protege bem as mãos.", "Confortável."],
    stock: 120
  },
  {
    id: '103',
    title: 'Controle Bluetooth para Celular',
    price: 85.00,
    image_url: 'https://images.unsplash.com/photo-1592840331052-16e15c2c6f95?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/103',
    category: 'Games',
    rating: 4.7,
    reviews_count: 3100,
    reviews: ["Transforma o celular em console.", "Sem lag."],
    stock: 90
  },
  {
    id: '104',
    title: 'Suporte Vertical para PS5 com Cooler',
    price: 145.00,
    image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/104',
    category: 'Games',
    rating: 4.9,
    reviews_count: 850,
    reviews: ["Mantém o console frio.", "Muito bonito."],
    stock: 25
  },
  {
    id: '105',
    title: 'Espelho Adereço com LED Touch',
    price: 75.00,
    image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/105',
    category: 'Decoração',
    rating: 4.8,
    reviews_count: 2100,
    reviews: ["Luz perfeita para make.", "Touch funciona bem."],
    stock: 65
  },
  {
    id: '106',
    title: 'Difusor de Aromas Elétrico Madeira',
    price: 59.00,
    image_url: 'https://images.unsplash.com/photo-1585771724684-252702b64428?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/106',
    category: 'Decoração',
    rating: 4.7,
    reviews_count: 4200,
    reviews: ["Deixa a casa cheirosa.", "Lindo objeto."],
    stock: 110
  },
  {
    id: '107',
    title: 'Kit Lettering Iniciante 15un',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/107',
    category: 'Papelaria',
    rating: 4.9,
    reviews_count: 1200,
    reviews: ["Tudo que precisa pra começar.", "Qualidade ótima."],
    stock: 150
  },
  {
    id: '108',
    title: 'Organizador de Mesa Acrílico',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/108',
    category: 'Papelaria',
    rating: 4.8,
    reviews_count: 800,
    reviews: ["Mesa ficou organizada.", "Resistente."],
    stock: 70
  },
  {
    id: '109',
    title: 'Kit Limpeza Automotiva 5 em 1',
    price: 55.00,
    image_url: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/109',
    category: 'Automotivo',
    rating: 4.6,
    reviews_count: 2500,
    reviews: ["Carro brilha muito.", "Produtos bons."],
    stock: 180
  },
  {
    id: '110',
    title: 'Capa Protetora de Banco Pet',
    price: 69.00,
    image_url: 'https://images.unsplash.com/photo-1506610154367-e297c1760300?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/110',
    category: 'Automotivo',
    rating: 4.9,
    reviews_count: 1100,
    reviews: ["Protege de verdade.", "Fácil de colocar."],
    stock: 95
  },
  {
    id: '111',
    title: 'Escova de Dentes Elétrica Sônica',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1559591937-e620a174629d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/111',
    category: 'Saúde',
    rating: 4.8,
    reviews_count: 3500,
    reviews: ["Limpeza profunda.", "Bateria dura semanas."],
    stock: 40
  },
  {
    id: '112',
    title: 'Almofada Ortopédica para Lombar',
    price: 125.00,
    image_url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/112',
    category: 'Saúde',
    rating: 4.7,
    reviews_count: 1200,
    reviews: ["Acabou minha dor nas costas.", "Muito macia."],
    stock: 50
  },
  {
    id: '113',
    title: 'Kit Jogo de Soquetes 46 Peças',
    price: 135.00,
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/113',
    category: 'Ferramentas',
    rating: 4.9,
    reviews_count: 800,
    reviews: ["Maleta muito completa.", "Aço de qualidade."],
    stock: 35
  },
  {
    id: '114',
    title: 'Trena Laser Digital 40M',
    price: 110.00,
    image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/114',
    category: 'Ferramentas',
    rating: 4.8,
    reviews_count: 650,
    reviews: ["Muito precisa.", "Facilita medições."],
    stock: 25
  },
  {
    id: '115',
    title: 'Andador Educativo Musical',
    price: 159.00,
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/115',
    category: 'Infantil',
    rating: 4.9,
    reviews_count: 1100,
    reviews: ["Divertido e seguro.", "Meu filho amou as músicas."],
    stock: 20
  },
  {
    id: '116',
    title: 'Kit 12 Babadores Bandana Algodão',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/116',
    category: 'Infantil',
    rating: 4.8,
    reviews_count: 3200,
    reviews: ["Estampas lindas.", "Tecido macio."],
    stock: 150
  },
  {
    id: '117',
    title: 'Livro: O Homem Mais Rico da Babilônia',
    price: 29.00,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/117',
    category: 'Livros',
    rating: 4.9,
    reviews_count: 18000,
    reviews: ["Essencial para finanças.", "Fácil de ler."],
    stock: 400
  },
  {
    id: '118',
    title: 'Livro: A Sutil Arte de Ligar o F*da-se',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/118',
    category: 'Livros',
    rating: 4.7,
    reviews_count: 12000,
    reviews: ["Muito engraçado e real.", "Vale a pena."],
    stock: 250
  },
  {
    id: '119',
    title: 'Pulseira de Prata Masculina Grumet',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1511499767390-903390e62bc0?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/119',
    category: 'Acessórios',
    rating: 4.8,
    reviews_count: 900,
    reviews: ["Peso bom.", "Prata de lei."],
    stock: 30
  },
  {
    id: '120',
    title: 'Óculos de Descanso Anti Luz Azul',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/120',
    category: 'Acessórios',
    rating: 4.7,
    reviews_count: 5200,
    reviews: ["Descansa muito a vista.", "Leve."],
    stock: 200
  },
  {
    id: '121',
    title: 'Ring Light 10 Polegadas com Tripé',
    price: 89.00,
    image_url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/121',
    category: 'Tecnologia',
    rating: 4.8,
    reviews_count: 3100,
    reviews: ["Iluminação ótima para vídeos.", "Tripé firme."],
    stock: 85
  },
  {
    id: '122',
    title: 'Microfone Condensador USB Profissional',
    price: 155.00,
    image_url: 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/122',
    category: 'Tecnologia',
    rating: 4.9,
    reviews_count: 1400,
    reviews: ["Áudio cristalino.", "Plug and play."],
    stock: 40
  },
  {
    id: '123',
    title: 'Mini Liquidificador Portátil 6 Lâminas',
    price: 55.00,
    image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/123',
    category: 'Cozinha',
    rating: 4.7,
    reviews_count: 6200,
    reviews: ["Bate fruta congelada.", "Muito prático."],
    stock: 180
  },
  {
    id: '124',
    title: 'Kit 10 Potes Herméticos Empilháveis',
    price: 145.00,
    image_url: 'https://images.unsplash.com/photo-1590373576350-3747056845e7?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/124',
    category: 'Cozinha',
    rating: 4.9,
    reviews_count: 2100,
    reviews: ["Organização nota 10.", "Vedação perfeita."],
    stock: 55
  },
  {
    id: '125',
    title: 'Tênis Casual Branco Minimalista',
    price: 110.00,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/125',
    category: 'Moda',
    rating: 4.8,
    reviews_count: 3500,
    reviews: ["Combina com tudo.", "Fácil de limpar."],
    stock: 120
  },
  {
    id: '126',
    title: 'Relógio Digital Esportivo Militar',
    price: 49.00,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/126',
    category: 'Moda',
    rating: 4.6,
    reviews_count: 8200,
    reviews: ["Muito resistente.", "À prova d'água."],
    stock: 300
  },
  {
    id: '127',
    title: 'Sérum Ácido Hialurônico Puro',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/127',
    category: 'Beleza',
    rating: 4.9,
    reviews_count: 4100,
    reviews: ["Hidratação profunda.", "Não é oleoso."],
    stock: 90
  },
  {
    id: '128',
    title: 'Kit 5 Faixas de Cabelo Maquiagem',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfad450216?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/128',
    category: 'Beleza',
    rating: 4.8,
    reviews_count: 2200,
    reviews: ["Fofas e úteis.", "Preço ótimo."],
    stock: 250
  },
  {
    id: '129',
    title: 'Comedouro Lento para Cães',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/129',
    category: 'Pet',
    rating: 4.7,
    reviews_count: 1500,
    reviews: ["Diminuiu a ansiedade.", "Funciona."],
    stock: 110
  },
  {
    id: '130',
    title: 'Escova Tira Pelos Autolimpante',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/130',
    category: 'Pet',
    rating: 4.9,
    reviews_count: 5200,
    reviews: ["Mágica.", "Muito fácil de usar."],
    stock: 180
  },
  {
    id: '131',
    title: 'Furadeira de Impacto Profissional 700W',
    price: 245.00,
    image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/131',
    category: 'Ferramentas',
    rating: 4.9,
    reviews_count: 1200,
    reviews: ["Muito forte.", "Excelente custo benefício."],
    stock: 30
  },
  {
    id: '132',
    title: 'Kit Chaves de Precisão 24 em 1',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/132',
    category: 'Ferramentas',
    rating: 4.8,
    reviews_count: 3500,
    reviews: ["Ótimo para eletrônicos.", "Pontas imantadas."],
    stock: 150
  },
  {
    id: '133',
    title: 'Lanterna Tática LED Recarregável',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/133',
    category: 'Ferramentas',
    rating: 4.7,
    reviews_count: 5200,
    reviews: ["Luz muito forte.", "Bateria dura bem."],
    stock: 200
  },
  {
    id: '134',
    title: 'Relógio Luxo Masculino Prata',
    price: 189.00,
    image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/134',
    category: 'Acessórios',
    rating: 4.9,
    reviews_count: 800,
    reviews: ["Muito elegante.", "Chama atenção."],
    stock: 25
  },
  {
    id: '135',
    title: 'Colar Feminino Ponto de Luz Prata',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/135',
    category: 'Acessórios',
    rating: 4.8,
    reviews_count: 4100,
    reviews: ["Delicado demais.", "Lindo brilho."],
    stock: 120
  },
  {
    id: '136',
    title: 'Kit 5 Meias Cano Curto Algodão',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1582965107903-0d75df446359?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/136',
    category: 'Moda',
    rating: 4.7,
    reviews_count: 15000,
    reviews: ["Confortáveis.", "Não apertam."],
    stock: 1000
  },
  {
    id: '137',
    title: 'Boné Aba Curva Minimalista',
    price: 29.00,
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/137',
    category: 'Moda',
    rating: 4.6,
    reviews_count: 3200,
    reviews: ["Ótimo ajuste.", "Tecido bom."],
    stock: 250
  },
  {
    id: '138',
    title: 'Massageador de Pescoço Shiatsu',
    price: 145.00,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/138',
    category: 'Saúde',
    rating: 4.9,
    reviews_count: 1100,
    reviews: ["Relaxamento total.", "Melhor compra."],
    stock: 40
  },
  {
    id: '139',
    title: 'Oxímetro de Pulso Digital',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1559591937-e620a174629d?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/139',
    category: 'Saúde',
    rating: 4.8,
    reviews_count: 8500,
    reviews: ["Preciso.", "Fácil de usar."],
    stock: 300
  },
  {
    id: '140',
    title: 'Aspirador de Pó Portátil Carro',
    price: 79.00,
    image_url: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/140',
    category: 'Automotivo',
    rating: 4.7,
    reviews_count: 4200,
    reviews: ["Potente pro tamanho.", "Cabo longo."],
    stock: 150
  },
  {
    id: '141',
    title: 'Suporte Celular Veicular Magnético',
    price: 19.00,
    image_url: 'https://images.unsplash.com/photo-1586105251261-72a756657741?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/141',
    category: 'Automotivo',
    rating: 4.8,
    reviews_count: 12000,
    reviews: ["Imã muito forte.", "Não cai."],
    stock: 800
  },
  {
    id: '142',
    title: 'Kit 24 Canetas Coloridas Fine Line',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/142',
    category: 'Papelaria',
    rating: 4.9,
    reviews_count: 5100,
    reviews: ["Cores vibrantes.", "Ponta ótima."],
    stock: 200
  },
  {
    id: '143',
    title: 'Caderno Inteligente A5 Marmorizado',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/143',
    category: 'Papelaria',
    rating: 4.8,
    reviews_count: 1500,
    reviews: ["Lindo e funcional.", "Folhas grossas."],
    stock: 60
  },
  {
    id: '144',
    title: 'Mouse Pad Gamer Extra Grande 90x40',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1616509091215-570093866336?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/144',
    category: 'Games',
    rating: 4.9,
    reviews_count: 8200,
    reviews: ["Desliza muito bem.", "Cobre a mesa toda."],
    stock: 180
  },
  {
    id: '145',
    title: 'Headset Gamer 7.1 Surround',
    price: 129.00,
    image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/145',
    category: 'Games',
    rating: 4.8,
    reviews_count: 2100,
    reviews: ["Som imersivo.", "Microfone limpo."],
    stock: 55
  },
  {
    id: '146',
    title: 'Tapete de Yoga Antiderrapante',
    price: 85.00,
    image_url: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/146',
    category: 'Esportes',
    rating: 4.7,
    reviews_count: 3200,
    reviews: ["Não escorrega.", "Boa espessura."],
    stock: 90
  },
  {
    id: '147',
    title: 'Corda de Pular com Contador Digital',
    price: 39.00,
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/147',
    category: 'Esportes',
    rating: 4.8,
    reviews_count: 1500,
    reviews: ["Ajuda muito no treino.", "Fácil de ajustar."],
    stock: 130
  },
  {
    id: '148',
    title: 'Kit 3 Quadros Decorativos Minimalistas',
    price: 75.00,
    image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/148',
    category: 'Decoração',
    rating: 4.9,
    reviews_count: 900,
    reviews: ["Lindos na sala.", "Impressão de qualidade."],
    stock: 45
  },
  {
    id: '149',
    title: 'Vaso de Planta Auto Irrigável',
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/149',
    category: 'Decoração',
    rating: 4.8,
    reviews_count: 2500,
    reviews: ["Minhas plantas agradecem.", "Prático."],
    stock: 110
  },
  {
    id: '150',
    title: 'Mesa Digitalizadora para Desenho',
    price: 289.00,
    image_url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=500&q=80',
    shopee_link: 'https://shopee.com.br/product/150',
    category: 'Tecnologia',
    rating: 4.9,
    reviews_count: 650,
    reviews: ["Sensibilidade ótima.", "Muito fina."],
    stock: 20
  }
];

const MOCK_SALES: Sale[] = [
  { id: '1', productTitle: 'Fone de Ouvido Bluetooth Pro Max', amount: 189.90, commission: 18.99, date: '2026-03-12 14:30', status: 'completed', source: 'TikTok' },
  { id: '2', productTitle: 'Smartwatch Ultra Series 9', amount: 159.00, commission: 15.90, date: '2026-03-12 12:15', status: 'pending', source: 'Instagram' },
  { id: '3', productTitle: 'Kit Cozinha Master 12 Peças', amount: 245.00, commission: 24.50, date: '2026-03-12 10:45', status: 'completed', source: 'TikTok' },
  { id: '4', productTitle: 'Luminária RGB Inteligente', amount: 89.90, commission: 8.99, date: '2026-03-11 22:20', status: 'cancelled', source: 'WhatsApp' },
  { id: '5', productTitle: 'Teclado Mecânico Gamer RGB', amount: 210.00, commission: 21.00, date: '2026-03-11 19:10', status: 'completed', source: 'YouTube' },
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Hash check removed as per user request for strict password protection on dashboard
  }, []);

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setView('admin');
      setIsMenuOpen(false);
    } else {
      setShowPasswordPrompt(true);
      setLoginError(false);
      setPasswordInput('');
      setIsMenuOpen(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'AFILIADOSHOPEE@2026') {
      setIsAuthenticated(true);
      setShowPasswordPrompt(false);
      setLoginError(false);
      setView('admin');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('store');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setView('store'); setSelectedProduct(null);}}>
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center neon-glow">
              <ShoppingBag size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight neon-text">GUIA DOS <span className="text-purple-500">ACHADINHOS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setView('store')} className={`text-sm font-medium transition-colors ${view === 'store' ? 'text-purple-500' : 'text-zinc-400 hover:text-white'}`}>Loja</button>
            <button onClick={handleAdminAccess} className={`text-sm font-medium transition-colors ${view === 'admin' ? 'text-purple-500' : 'text-zinc-400 hover:text-white'}`}>Dashboard BI</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-white/5 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all w-48 lg:w-64"
              />
            </div>
            <button className="md:hidden text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#09090b] pt-20 px-4 md:hidden flex flex-col gap-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex flex-col gap-6 text-center">
              <button onClick={() => {setView('store'); setIsMenuOpen(false);}} className="text-2xl font-bold">Loja</button>
              <button onClick={handleAdminAccess} className="text-2xl font-bold">Dashboard BI</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {showPasswordPrompt ? (
          <div className="max-w-md mx-auto mt-20 p-8 bg-zinc-900 rounded-3xl border border-white/5 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold">Acesso Restrito</h2>
              <p className="text-zinc-500 text-sm">Digite a senha para acessar o painel administrativo.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  placeholder="Senha"
                  className={`w-full bg-black border ${loginError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-all`}
                  autoFocus
                />
                {loginError && (
                  <p className="text-red-500 text-xs font-bold ml-1">Senha incorreta. Tente novamente.</p>
                )}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowPasswordPrompt(false)} className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition-all">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-all">Entrar</button>
              </div>
            </form>
          </div>
        ) : view === 'store' ? (
          selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : (
            <Storefront onSelectProduct={setSelectedProduct} searchQuery={searchQuery} products={products} />
          )
        ) : (
          <AdminDashboard onLogout={handleLogout} products={products} setProducts={setProducts} />
        )}
      </main>
    </div>
  );
}

function ProductRow({ title, products: initialProducts, category, onSelectProduct, onSeeAll }: { title: string, products: Product[], category?: string, onSelectProduct: (p: Product) => void, onSeeAll: (cat: string) => void }) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>(initialProducts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setDisplayProducts(initialProducts);
  }, [initialProducts]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const moreProducts = initialProducts.map(p => ({
        ...p,
        id: `${p.id}-inf-${Math.random().toString(36).substr(2, 9)}`,
        title: `${p.title} (Refil)`
      }));
      setDisplayProducts(prev => [...prev, ...moreProducts]);
      setIsLoadingMore(false);
    }, 800);
  };

  if (initialProducts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {category && (
          <button 
            onClick={() => onSeeAll(category)}
            className="text-xs font-bold text-purple-500 hover:text-purple-400 transition-colors uppercase tracking-widest"
          >
            Ver Tudo
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
        {displayProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(idx * 0.05, 0.5) }}
            whileHover={{ y: -5 }}
            className="flex-shrink-0 w-[180px] sm:w-[240px] lg:w-[280px] snap-start bg-[#18181b] rounded-2xl overflow-hidden border border-white/5 group cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img src={product.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.title} referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-bold">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                {product.rating}
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">{product.category}</span>
                <h3 className="font-bold text-lg line-clamp-1 group-hover:text-purple-400 transition-colors">{product.title}</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black">R$ {product.price.toFixed(2)}</span>
                <button className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 w-[180px] sm:w-[240px] lg:w-[280px] snap-start bg-zinc-900/30 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-8 text-center space-y-4 group cursor-pointer hover:border-purple-500/50 transition-colors"
          onClick={handleLoadMore}
        >
          <div className={`w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all ${isLoadingMore ? 'animate-spin' : ''}`}>
            {isLoadingMore ? <Sparkles size={24} /> : <Plus size={24} />}
          </div>
          <div>
            <p className="font-bold text-sm">{isLoadingMore ? 'Gerando mais...' : 'Ver mais produtos'}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Infinitos Achadinhos</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Storefront({ onSelectProduct, searchQuery, products }: { onSelectProduct: (p: Product) => void, searchQuery: string, products: Product[] }) {
  const categories = [
    "Todos", 
    "Mais Vendidos", 
    "Promoção", 
    "Cozinha", 
    "Eletrônicos", 
    "Moda", 
    "Beleza", 
    "Pet", 
    "Esportes",
    "Games",
    "Decoração",
    "Papelaria",
    "Automotivo",
    "Saúde",
    "Ferramentas",
    "Infantil",
    "Livros",
    "Acessórios",
    "Tecnologia"
  ];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === "Todos") return matchesSearch;
    return matchesSearch && p.category === activeCategory;
  });

  return (
    <div className="space-y-12">
      {!searchQuery && (
        <section className="relative h-[350px] sm:h-[500px] lg:h-[600px] rounded-3xl sm:rounded-[48px] overflow-hidden flex items-center px-6 sm:px-12 lg:px-24 border border-white/10 group">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-110" alt="Hero" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 sm:via-[#09090b]/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-6 sm:space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-500 animate-ping" />
              <span className="text-purple-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Ofertas da Semana</span>
            </motion.div>
            <div className="space-y-3 sm:space-y-4">
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                ACHADINHOS <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500">SHOPEE</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-zinc-400 text-base sm:text-xl max-w-xs sm:max-w-md font-medium leading-relaxed">Os melhores produtos com os maiores descontos, selecionados a dedo.</motion.p>
            </div>
          </div>
        </section>
      )}

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-purple-600 text-white neon-glow' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-white/5'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        <ProductRow title="✨ Tendências de Hoje" products={filteredProducts} category="Todos" onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🎧 Tecnologia & Eletrônicos" category="Eletrônicos" products={filteredProducts.filter(p => p.category === 'Eletrônicos' || p.category === 'Tecnologia')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="👗 Moda & Estilo" category="Moda" products={filteredProducts.filter(p => p.category === 'Moda')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🏠 Casa & Decoração" category="Cozinha" products={filteredProducts.filter(p => p.category === 'Cozinha' || p.category === 'Decoração')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🎮 Mundo Gamer" category="Games" products={filteredProducts.filter(p => p.category === 'Games')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="💅 Beleza & Saúde" category="Beleza" products={filteredProducts.filter(p => p.category === 'Beleza' || p.category === 'Saúde')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="⚽ Esportes & Lazer" category="Esportes" products={filteredProducts.filter(p => p.category === 'Esportes')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="📚 Livros & Papelaria" category="Livros" products={filteredProducts.filter(p => p.category === 'Livros' || p.category === 'Papelaria')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🚗 Automotivo" category="Automotivo" products={filteredProducts.filter(p => p.category === 'Automotivo')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🧸 Espaço Infantil" category="Infantil" products={filteredProducts.filter(p => p.category === 'Infantil')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🐾 Mundo Pet" category="Pet" products={filteredProducts.filter(p => p.category === 'Pet')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="🛠️ Ferramentas & DIY" category="Ferramentas" products={filteredProducts.filter(p => p.category === 'Ferramentas')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
        <ProductRow title="💍 Acessórios & Joias" category="Acessórios" products={filteredProducts.filter(p => p.category === 'Acessórios')} onSelectProduct={onSelectProduct} onSeeAll={setActiveCategory} />
      </div>
    </div>
  );
}

function ProductDetail({ product, onBack }: { product: Product, onBack: () => void }) {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [reviews, setReviews] = useState<string[]>(product.reviews || []);
  const [isFetchingReviews, setIsFetchingReviews] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const summary = await summarizeReviews(reviews);
    setAiSummary(summary);
    setIsSummarizing(false);
  };

  const handleFetchReviews = async () => {
    setIsFetchingReviews(true);
    const moreReviews = await generateMoreReviews(product.title);
    setReviews(prev => [...moreReviews, ...prev]);
    setIsFetchingReviews(false);
  };

  return (
    <div className="space-y-12">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"><X size={20} /> Voltar para a loja</button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
          <img src={product.image_url} className="w-full h-full object-cover" alt={product.title} />
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">{product.category}</span>
              <div className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor" /><span className="text-sm font-bold">{product.rating}</span></div>
            </div>
            <h1 className="text-4xl font-black leading-tight">{product.title}</h1>
            <span className="text-4xl font-black text-white">R$ {product.price.toFixed(2)}</span>
          </div>
          
          <div className="p-6 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2"><Sparkles size={18} className="text-purple-500" /> Veredito da IA</h3>
              <button 
                onClick={handleSummarize} 
                disabled={isSummarizing || reviews.length === 0} 
                className="text-xs font-bold text-purple-400 hover:text-purple-300 disabled:opacity-50"
              >
                {isSummarizing ? 'Analisando...' : '✨ Resumir Avaliações'}
              </button>
            </div>
            {aiSummary ? (
              <p className="text-zinc-400 text-sm leading-relaxed italic">"{aiSummary}"</p>
            ) : (
              <p className="text-zinc-600 text-sm">Clique para gerar um resumo inteligente das avaliações reais.</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold flex items-center gap-2"><MessageSquare size={18} className="text-purple-500" /> Avaliações Reais</h3>
              <button 
                onClick={handleFetchReviews} 
                disabled={isFetchingReviews}
                className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              >
                {isFetchingReviews ? <Sparkles size={12} className="animate-spin" /> : <Plus size={12} />}
                Puxar mais avaliações
              </button>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
              {reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <motion.div 
                    key={`${idx}-${review}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 bg-zinc-900/30 rounded-xl border border-white/5 text-xs text-zinc-400 leading-relaxed"
                  >
                    {review}
                  </motion.div>
                ))
              ) : (
                <p className="text-zinc-600 text-xs text-center py-4">Nenhuma avaliação disponível ainda.</p>
              )}
            </div>
          </div>

          <a href={product.shopee_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all neon-glow group">
            CONFERIR NA SHOPEE <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout, products, setProducts }: { onLogout: () => void, products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'sales' | 'affiliates' | 'tools' | 'financial' | 'marketing' | 'analytics' | 'team' | 'support' | 'settings'>('overview');
  const [seoCaptionInput, setSeoCaptionInput] = useState({ title: '', niche: '' });
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [bioNicheInput, setBioNicheInput] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const handleGenerateBio = async () => {
    if (!bioNicheInput) return;
    setIsGeneratingBio(true);
    const bio = await generateInstagramBio(bioNicheInput);
    setGeneratedBio(bio);
    setIsGeneratingBio(false);
  };

  const handleGenerateCaption = async () => {
    if (!seoCaptionInput.title) return;
    setIsGeneratingCaption(true);
    const caption = await generateSEOCaption(seoCaptionInput.title, seoCaptionInput.niche);
    setGeneratedCaption(caption);
    setIsGeneratingCaption(false);
  };
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState<StatsOverview>({ totalSales: 0, totalCommission: 0, pendingCommission: 0, totalClicks: 0, conversionRate: 0, averageTicket: 0, epc: 0, cancellationRate: 0, activeProducts: 0, growthRate: 0 });
  const [financialStats, setFinancialStats] = useState({ availableBalance: 4520.50, totalWithdrawn: 12840.00, pendingWithdrawal: 850.00 });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [recentSales, setRecentSales] = useState<Sale[]>(MOCK_SALES);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Product Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '',
    price: 0,
    category: 'Eletrônicos',
    image_url: '',
    shopee_link: '',
    affiliate_link: '',
    commission_rate: 10,
    rating: 5.0,
    reviews_count: 0,
    stock: 100
  });

  useEffect(() => {
    fetch('/api/stats/overview').then(res => res.json()).then(data => setStats({...data, pendingCommission: 1245.80, conversionRate: 4.2, averageTicket: 142.50, epc: 0.85, cancellationRate: 2.1, activeProducts: products.length, growthRate: 12.5 }));
    fetch('/api/stats/chart').then(res => res.json()).then(setChartData);
  }, [products.length]);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync/shopee', { method: 'POST' });
      const data = await res.json();
      if (data.success) alert(`Sincronização concluída!`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...newProduct as Product,
      id: Math.random().toString(36).substr(2, 9),
      reviews: []
    };
    setProducts([product, ...products]);
    setShowAddProduct(false);
    setNewProduct({ title: '', price: 0, category: 'Eletrônicos', image_url: '', shopee_link: '', rating: 5.0, reviews_count: 0, stock: 100 });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#18181b] p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Layout className="text-purple-500" /> 
            BI <span className="text-purple-500">Dashboard</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Controle Total do Ecossistema</p>
        </div>
        
        <nav className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard', icon: <TrendingUp size={14} /> },
            { id: 'products', label: 'Produtos', icon: <Package size={14} /> },
            { id: 'sales', label: 'Vendas', icon: <DollarSign size={14} /> },
            { id: 'financial', label: 'Financeiro', icon: <Wallet size={14} /> },
            { id: 'affiliates', label: 'Afiliados', icon: <Users size={14} /> },
            { id: 'marketing', label: 'Marketing', icon: <Megaphone size={14} /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart size={14} /> },
            { id: 'tools', label: 'Ferramentas', icon: <Zap size={14} /> },
            { id: 'team', label: 'Equipe', icon: <ShieldCheck size={14} /> },
            { id: 'support', label: 'Suporte', icon: <HelpCircle size={14} /> },
            { id: 'settings', label: 'Configurações', icon: <Settings size={14} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-white/5 text-zinc-400 hover:text-white transition-all relative"
            >
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#18181b]"></span>
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
                    <span className="font-bold text-xs uppercase tracking-widest">Notificações</span>
                    <button className="text-[10px] text-purple-500 font-bold">Limpar tudo</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { title: 'Nova Venda!', desc: 'Você recebeu R$ 18,90 de comissão.', time: '2 min atrás', icon: <DollarSign size={14} />, color: 'text-green-500' },
                      { title: 'Novo Afiliado', desc: 'Julia Costa acabou de se cadastrar.', time: '1 hora atrás', icon: <Users size={14} />, color: 'text-blue-500' },
                      { title: 'Estoque Baixo', desc: 'Fone Bluetooth Pro está com 2 unidades.', time: '5 horas atrás', icon: <AlertCircle size={14} />, color: 'text-red-500' },
                    ].map((n, i) => (
                      <div key={i} className="p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer">
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center ${n.color}`}>{n.icon}</div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-white">{n.title}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{n.desc}</p>
                            <p className="text-[8px] text-zinc-600 mt-1 uppercase font-bold">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={handleSync} disabled={isSyncing} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/5 rounded-xl font-bold text-xs transition-all disabled:opacity-50">
            <Zap size={14} className={isSyncing ? 'animate-pulse text-yellow-500' : 'text-yellow-500'} />
            {isSyncing ? 'Sincronizando...' : 'Sync Shopee'}
          </button>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl font-bold text-xs transition-all">Sair</button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Faturamento Total" value={`R$ ${stats.totalSales.toLocaleString()}`} icon={<DollarSign className="text-green-400" size={16} />} trend="+12.5%" />
                <StatCard title="Comissões Pagas" value={`R$ ${stats.totalCommission.toLocaleString()}`} icon={<CheckCircle2 className="text-purple-400" size={16} />} trend="+8.2%" />
                <StatCard title="Cliques Únicos" value={stats.totalClicks.toLocaleString()} icon={<ArrowUpRight className="text-blue-400" size={16} />} trend="+15.4%" />
                <StatCard title="Taxa de Conversão" value={`${stats.conversionRate}%`} icon={<Target className="text-emerald-400" size={16} />} trend="-0.5%" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Shopee API</p>
                    <h4 className="text-sm font-black text-green-500">Conectado</h4>
                  </div>
                </div>
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                    <Percent size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Comissão Média</p>
                    <h4 className="text-sm font-black">12.4%</h4>
                  </div>
                </div>
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Produtos Sincronizados</p>
                    <h4 className="text-sm font-black">{products.length} Itens</h4>
                  </div>
                </div>
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Último Sync</p>
                    <h4 className="text-sm font-black">Há 5 min</h4>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { icon: <LinkIcon size={20} />, label: 'Converter', tab: 'tools' },
                  { icon: <Video size={20} />, label: 'Baixar Vídeo', tab: 'tools' },
                  { icon: <Wallet size={20} />, label: 'Sacar', tab: 'financial' },
                  { icon: <Plus size={20} />, label: 'Novo Produto', tab: 'products' },
                  { icon: <Megaphone size={20} />, label: 'Campanha', tab: 'marketing' },
                  { icon: <BarChart size={20} />, label: 'Relatórios', tab: 'analytics' },
                  { icon: <HelpCircle size={20} />, label: 'Suporte', tab: 'support' },
                  { icon: <Settings size={20} />, label: 'Ajustes', tab: 'settings' },
                ].map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveTab(action.tab as any)}
                    className="flex flex-col items-center justify-center p-4 bg-[#18181b] hover:bg-zinc-800 rounded-2xl border border-white/5 transition-all group"
                  >
                    <div className="p-3 bg-zinc-900 group-hover:bg-purple-500/10 group-hover:text-purple-500 rounded-xl transition-all mb-2">
                      {action.icon}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase tracking-tight">{action.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Activity size={20} className="text-purple-500" /> Performance de Vendas</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[10px] text-zinc-500 font-bold uppercase">Cliques</span></div>
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] text-zinc-500 font-bold uppercase">Vendas</span></div>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="date" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="clicks" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                        <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Clock size={20} className="text-orange-500" /> Atividade Recente</h3>
                  <div className="space-y-4">
                    {recentSales.slice(0, 5).map(sale => (
                      <div key={sale.id} className="flex items-center gap-4 p-3 bg-black/20 rounded-2xl border border-white/5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sale.status === 'completed' ? 'bg-green-500/10 text-green-500' : sale.status === 'pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'}`}>
                          <ShoppingBag size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate">{sale.productTitle}</h4>
                          <p className="text-[10px] text-zinc-500">{sale.date} • {sale.source}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-white">R$ {sale.amount.toFixed(2)}</p>
                          <p className="text-[10px] text-purple-500 font-bold">+{sale.commission.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab('sales')} className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-xs font-bold transition-all">Ver Relatório Completo</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Gerenciamento de <span className="text-purple-500">Produtos</span></h2>
                <button 
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl font-black text-sm transition-all shadow-lg shadow-purple-500/20"
                >
                  <PlusCircle size={18} />
                  Novo Produto
                </button>
              </div>

              {showAddProduct && (
                <motion.form 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onSubmit={handleAddProduct}
                  className="bg-[#18181b] p-8 rounded-3xl border border-purple-500/30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nome do Produto</label>
                    <input required type="text" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preço (R$)</label>
                    <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Categoria</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none">
                      {["Eletrônicos", "Casa", "Moda", "Beleza", "Pet", "Ferramentas", "Tecnologia", "Cozinha", "Infantil", "Livros", "Acessórios", "Saúde", "Automotivo", "Papelaria", "Games", "Esportes", "Decoração"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Link da Imagem</label>
                    <input required type="url" value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                  </div>
                  <div className="lg:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Link Original Shopee</label>
                    <input required type="url" value={newProduct.shopee_link} onChange={e => setNewProduct({...newProduct, shopee_link: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" placeholder="https://shopee.com.br/..." />
                  </div>
                  <div className="lg:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Link de Afiliado (Deep Link)</label>
                    <input required type="url" value={newProduct.affiliate_link} onChange={e => setNewProduct({...newProduct, affiliate_link: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" placeholder="https://shopee.com.br/...smtt=..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Comissão (%)</label>
                    <input required type="number" value={newProduct.commission_rate} onChange={e => setNewProduct({...newProduct, commission_rate: parseInt(e.target.value)})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">URL do Vídeo (Opcional)</label>
                    <input type="url" value={newProduct.video_url} onChange={e => setNewProduct({...newProduct, video_url: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" placeholder="https://video.shopee..." />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-sm transition-all">Salvar Produto</button>
                  </div>
                </motion.form>
              )}

              <div className="bg-[#18181b] rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/5">
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Produto</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Categoria</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preço</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Comissão</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Estoque</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.image_url} className="w-10 h-10 rounded-lg object-cover" alt="" />
                            <span className="font-bold text-sm truncate max-w-[200px]">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-zinc-800 rounded-md text-[10px] font-bold text-zinc-400">{p.category}</span>
                        </td>
                        <td className="px-6 py-4 font-black text-sm">R$ {p.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-purple-500">{p.commission_rate}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: `${Math.min(p.stock || 0, 100)}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-zinc-500">{p.stock || 0}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-purple-500/10 hover:text-purple-500 rounded-lg transition-colors"><Edit3 size={16} /></button>
                            <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Relatório de <span className="text-purple-500">Vendas</span></h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2"><FileText size={14} /> Exportar CSV</button>
                  <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2"><Calendar size={14} /> Filtrar Data</button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 space-y-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Vendas Hoje</p>
                  <h4 className="text-2xl font-black">R$ 1.450,00</h4>
                  <p className="text-[10px] text-green-500 font-bold">+15% vs ontem</p>
                </div>
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 space-y-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ticket Médio</p>
                  <h4 className="text-2xl font-black">R$ 142,50</h4>
                  <p className="text-[10px] text-zinc-500 font-bold">Estável</p>
                </div>
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 space-y-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Aguardando Pagamento</p>
                  <h4 className="text-2xl font-black text-orange-500">R$ 840,00</h4>
                  <p className="text-[10px] text-zinc-500 font-bold">12 pedidos</p>
                </div>
                <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 space-y-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Taxa de Cancelamento</p>
                  <h4 className="text-2xl font-black text-red-500">2.1%</h4>
                  <p className="text-[10px] text-green-500 font-bold">-0.5% este mês</p>
                </div>
              </div>

              <div className="bg-[#18181b] rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/5">
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ID</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Produto</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Valor</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Comissão</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Origem</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentSales.map(sale => (
                      <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-xs font-mono text-zinc-500">#{sale.id}</td>
                        <td className="px-6 py-4 font-bold text-sm">{sale.productTitle}</td>
                        <td className="px-6 py-4 font-black text-sm">R$ {sale.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 font-bold text-sm text-purple-500">R$ {sale.commission.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                            <Share2 size={12} /> {sale.source}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${sale.status === 'completed' ? 'bg-green-500/10 text-green-500' : sale.status === 'pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'}`}>
                            {sale.status === 'completed' ? 'Concluída' : sale.status === 'pending' ? 'Pendente' : 'Cancelada'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'affiliates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Rede de <span className="text-purple-500">Afiliados</span></h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl font-black text-sm transition-all shadow-lg shadow-purple-500/20">
                  <PlusCircle size={18} />
                  Convidar Afiliado
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ana Silva', sales: 124, commission: 1240.50, clicks: 5200, avatar: 'https://i.pravatar.cc/150?u=ana' },
                  { name: 'Marcos Oliveira', sales: 89, commission: 890.20, clicks: 3100, avatar: 'https://i.pravatar.cc/150?u=marcos' },
                  { name: 'Julia Costa', sales: 215, commission: 2150.00, clicks: 8900, avatar: 'https://i.pravatar.cc/150?u=julia' },
                ].map((aff, i) => (
                  <div key={i} className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                      <img src={aff.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/20" alt="" />
                      <div>
                        <h4 className="text-lg font-black">{aff.name}</h4>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Afiliado Nível Gold</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Vendas</p>
                        <p className="text-xl font-black">{aff.sales}</p>
                      </div>
                      <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Comissão</p>
                        <p className="text-xl font-black text-purple-500">R$ {aff.commission.toFixed(0)}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-zinc-500">Meta Mensal</span>
                        <span className="text-white">85%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-xs font-bold transition-all">Ver Detalhes</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Gestão <span className="text-purple-500">Financeira</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-3xl border border-white/5 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet size={120} /></div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Saldo Disponível</p>
                  <h3 className="text-4xl font-black text-white">R$ {financialStats.availableBalance.toLocaleString()}</h3>
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-xs transition-all shadow-lg shadow-purple-500/20">Solicitar Saque</button>
                    <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-white/5 transition-all"><History size={18} /></button>
                  </div>
                </div>
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-4">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Sacado</p>
                  <h3 className="text-4xl font-black text-zinc-400">R$ {financialStats.totalWithdrawn.toLocaleString()}</h3>
                  <p className="text-[10px] text-green-500 font-bold flex items-center gap-1"><ArrowUpRight size={12} /> +R$ 2.400 este mês</p>
                </div>
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-4">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Saques Pendentes</p>
                  <h3 className="text-4xl font-black text-orange-500">R$ {financialStats.pendingWithdrawal.toLocaleString()}</h3>
                  <p className="text-[10px] text-zinc-500 font-bold">2 solicitações em análise</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><CreditCard size={20} className="text-blue-500" /> Dados Bancários / PIX</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 font-black text-xs">PIX</div>
                        <div>
                          <p className="text-xs font-bold">Chave Aleatória</p>
                          <p className="text-[10px] text-zinc-500">a1b2c3d4-e5f6-g7h8-i9j0...</p>
                        </div>
                      </div>
                      <button className="text-[10px] text-purple-500 font-bold hover:underline">Alterar</button>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500"><Globe size={18} /></div>
                        <div>
                          <p className="text-xs font-bold">Conta Bancária</p>
                          <p className="text-[10px] text-zinc-500">Não configurado</p>
                        </div>
                      </div>
                      <button className="text-[10px] text-zinc-400 font-bold hover:underline">Configurar</button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><History size={20} className="text-zinc-400" /> Últimos Saques</h3>
                  <div className="space-y-3">
                    {[
                      { date: '10/03/2026', amount: 1200.00, status: 'Concluído', method: 'PIX' },
                      { date: '05/03/2026', amount: 850.00, status: 'Pendente', method: 'PIX' },
                      { date: '28/02/2026', amount: 2100.00, status: 'Concluído', method: 'PIX' },
                    ].map((w, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${w.status === 'Concluído' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          <div>
                            <p className="text-xs font-bold">R$ {w.amount.toFixed(2)}</p>
                            <p className="text-[10px] text-zinc-500">{w.date} via {w.method}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold ${w.status === 'Concluído' ? 'text-green-500' : 'text-orange-500'}`}>{w.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'marketing' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Central de <span className="text-purple-500">Marketing</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Megaphone size={20} className="text-orange-500" /> Campanhas Ativas</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Semana do Consumidor', reach: '12.4k', conversion: '3.2%', status: 'Ativa' },
                      { name: 'Ofertas Relâmpago TikTok', reach: '45.8k', conversion: '5.1%', status: 'Ativa' },
                    ].map((c, i) => (
                      <div key={i} className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm">{c.name}</h4>
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-black rounded-md uppercase tracking-widest">{c.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><p className="text-[10px] text-zinc-500 font-bold uppercase">Alcance</p><p className="text-lg font-black">{c.reach}</p></div>
                          <div><p className="text-[10px] text-zinc-500 font-bold uppercase">Conversão</p><p className="text-lg font-black text-purple-500">{c.conversion}</p></div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-xs font-bold transition-all border border-white/5">Criar Nova Campanha</button>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Percent size={20} className="text-emerald-500" /> Cupons & Promoções</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/40 rounded-2xl border border-dashed border-emerald-500/30 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-emerald-500">ACHADINHOS10</p>
                        <p className="text-[10px] text-zinc-500">10% OFF em toda a loja</p>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500"><Trash2 size={16} /></button>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-dashed border-zinc-700 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-400">FRETEGRATIS</p>
                        <p className="text-[10px] text-zinc-500">Válido acima de R$ 99</p>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500"><Trash2 size={16} /></button>
                    </div>
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-black text-sm transition-all shadow-lg shadow-emerald-500/20">Gerar Novo Cupom</button>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Instagram size={20} className="text-pink-500" /> Gerador de Bio (Instagram)</h3>
                  <p className="text-xs text-zinc-500">Gere biografias profissionais e otimizadas para converter seguidores em compradores.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nicho da Loja</label>
                      <input 
                        type="text" 
                        value={bioNicheInput}
                        onChange={(e) => setBioNicheInput(e.target.value)}
                        placeholder="Ex: Achadinhos de Cozinha, Moda Feminina..." 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" 
                      />
                    </div>
                    <button 
                      onClick={handleGenerateBio}
                      disabled={isGeneratingBio || !bioNicheInput}
                      className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 rounded-xl font-black text-sm transition-all"
                    >
                      {isGeneratingBio ? 'Gerando...' : 'Gerar Bio com IA'}
                    </button>

                    {generatedBio && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-black/40 rounded-2xl border border-pink-500/20 space-y-3"
                      >
                        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">{generatedBio}</p>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedBio);
                            alert('Bio copiada!');
                          }}
                          className="text-[10px] font-bold text-pink-500 hover:underline uppercase tracking-widest"
                        >
                          Copiar Bio
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Video size={20} className="text-purple-500" /> Gerador de Legendas SEO</h3>
                  <p className="text-xs text-zinc-500">Crie legendas virais e otimizadas para seus vídeos de produtos no TikTok e Reels.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nome do Produto</label>
                      <input 
                        type="text" 
                        value={seoCaptionInput.title}
                        onChange={(e) => setSeoCaptionInput({ ...seoCaptionInput, title: e.target.value })}
                        placeholder="Ex: Mini Aspirador Portátil..." 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nicho (Opcional)</label>
                      <input 
                        type="text" 
                        value={seoCaptionInput.niche}
                        onChange={(e) => setSeoCaptionInput({ ...seoCaptionInput, niche: e.target.value })}
                        placeholder="Ex: Achadinhos de Casa, Tecnologia..." 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" 
                      />
                    </div>
                    <button 
                      onClick={handleGenerateCaption}
                      disabled={isGeneratingCaption || !seoCaptionInput.title}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-black text-sm transition-all"
                    >
                      {isGeneratingCaption ? 'Gerando...' : 'Gerar Legenda SEO'}
                    </button>

                    {generatedCaption && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-black/40 rounded-2xl border border-purple-500/20 space-y-3"
                      >
                        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">{generatedCaption}</p>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCaption);
                            alert('Legenda copiada!');
                          }}
                          className="text-[10px] font-bold text-purple-500 hover:underline uppercase tracking-widest"
                        >
                          Copiar Legenda
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Advanced <span className="text-purple-500">Analytics</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <StatCard title="LTV (Life Time Value)" value="R$ 452,00" icon={<TrendingUp className="text-purple-400" size={16} />} trend="+5.2%" />
                <StatCard title="CAC Médio" value="R$ 12,40" icon={<DollarSign className="text-red-400" size={16} />} trend="-2.1%" />
                <StatCard title="Churn Rate" value="1.8%" icon={<Activity className="text-orange-400" size={16} />} trend="-0.4%" />
                <StatCard title="ROI Médio" value="4.2x" icon={<Target className="text-green-400" size={16} />} trend="+0.8x" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><PieChart size={20} className="text-blue-500" /> Origem do Tráfego</h3>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="space-y-4 w-full">
                      {[
                        { label: 'TikTok Ads', value: 45, color: 'bg-purple-500' },
                        { label: 'Instagram Organic', value: 30, color: 'bg-pink-500' },
                        { label: 'Google Search', value: 15, color: 'bg-blue-500' },
                        { label: 'Direto / Outros', value: 10, color: 'bg-zinc-700' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase">
                            <span className="text-zinc-500">{item.label}</span>
                            <span className="text-white">{item.value}%</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Globe2 size={20} className="text-emerald-500" /> Dispositivos & Regiões</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-around">
                      <div className="text-center"><p className="text-2xl font-black">82%</p><p className="text-[10px] text-zinc-500 font-bold uppercase">Mobile</p></div>
                      <div className="text-center"><p className="text-2xl font-black">18%</p><p className="text-[10px] text-zinc-500 font-bold uppercase">Desktop</p></div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Principais Estados</p>
                      {['São Paulo', 'Rio de Janeiro', 'Minas Gerais'].map((state, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">{state}</span>
                          <span className="font-bold">{40 - i * 10}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><ShoppingBag size={20} className="text-purple-500" /> Produtos Mais Vendidos</h3>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={p.image_url} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-bold text-white truncate w-32">{p.title}</p>
                            <p className="text-[10px] text-zinc-500">{p.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-purple-500">124 vendas</p>
                          <p className="text-[10px] text-zinc-500">R$ 2.450,00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Gestão de <span className="text-purple-500">Equipe</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black flex items-center gap-2"><Users size={20} className="text-purple-500" /> Membros da Equipe</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-xs transition-all"><UserPlus size={14} /> Adicionar</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Erick Bruno', role: 'Proprietário', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=erick' },
                      { name: 'Admin Suporte', role: 'Moderador', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=support' },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={member.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
                          <div>
                            <p className="text-sm font-bold">{member.name}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-green-500' : 'bg-zinc-700'}`}></span>
                          <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500"><Settings size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Terminal size={20} className="text-zinc-500" /> Logs de Atividade</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Produto Editado', user: 'Erick', time: '10 min atrás' },
                      { action: 'Saque Aprovado', user: 'Sistema', time: '1 hora atrás' },
                      { action: 'Login Realizado', user: 'Admin', time: '2 horas atrás' },
                      { action: 'Cupom Criado', user: 'Erick', time: '5 horas atrás' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-3 text-xs">
                        <div className="w-1 bg-purple-500/20 rounded-full"></div>
                        <div>
                          <p className="font-bold text-zinc-300">{log.action}</p>
                          <p className="text-[10px] text-zinc-500">por {log.user} • {log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Ferramentas de <span className="text-purple-500">Crescimento</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><LinkIcon size={20} className="text-purple-500" /> Conversor de Links Shopee</h3>
                  <p className="text-xs text-zinc-500">Transforme links normais em links de afiliado automaticamente com seu ID.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Link do Produto</label>
                      <input type="text" placeholder="https://shopee.com.br/..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                    </div>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-sm transition-all">Converter para Afiliado</button>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Share2 size={20} className="text-blue-500" /> Encurtador de Links</h3>
                  <p className="text-xs text-zinc-500">Transforme links longos da Shopee em links amigáveis e rastreáveis para suas redes sociais.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Link Original</label>
                      <input type="text" placeholder="https://shopee.com.br/produto-muito-longo..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Slug Personalizado (Opcional)</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-600">achadinhos.com/</span>
                        <input type="text" placeholder="meu-link" className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                      </div>
                    </div>
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm transition-all">Gerar Link Curto</button>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Zap size={20} className="text-yellow-500" /> Gerador de Criativos (IA)</h3>
                  <p className="text-xs text-zinc-500">Gere legendas e scripts para TikTok/Reels baseados nos produtos da sua loja.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Selecione o Produto</label>
                      <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none">
                        {products.slice(0, 10).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                    </div>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-sm transition-all">Gerar Script com IA</button>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Video size={20} className="text-red-500" /> Shopee Video Downloader</h3>
                  <p className="text-xs text-zinc-500">Baixe vídeos de produtos da Shopee sem marca d'água para usar no Reels/TikTok.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Link do Produto ou Vídeo</label>
                      <input type="text" placeholder="https://shopee.com.br/..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                    </div>
                    <button className="w-full py-3 bg-red-600 hover:bg-red-500 rounded-xl font-black text-sm transition-all">Baixar Vídeo HD</button>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><LinkIcon size={20} className="text-emerald-500" /> Conversor em Massa</h3>
                  <p className="text-xs text-zinc-500">Cole vários links da Shopee para converter todos de uma vez em links de afiliado.</p>
                  <div className="space-y-4">
                    <textarea 
                      placeholder="Cole um link por linha..."
                      className="w-full h-24 bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-purple-500 outline-none resize-none"
                    />
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-black text-sm transition-all">Converter Lista</button>
                  </div>
                </div>
              </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2"><Percent size={20} className="text-orange-500" /> Cupons Shopee Ativos</h3>
                  <p className="text-xs text-zinc-500">Aproveite os cupons oficiais da Shopee para aumentar suas conversões.</p>
                  <div className="space-y-3">
                    {[
                      { code: 'SHOPEE20', desc: 'R$ 20 OFF acima de R$ 100', type: 'Desconto' },
                      { code: 'FRETEGRATIS', desc: 'Frete Grátis sem valor mínimo', type: 'Logística' },
                      { code: 'MOEDAS10', desc: '10% de Cashback em Moedas', type: 'Cashback' },
                      { code: 'BEMVINDO30', desc: 'R$ 30 OFF para primeira compra', type: 'Novo Usuário' },
                      { code: 'CUPOM50', desc: 'R$ 50 OFF em compras acima de R$ 250', type: 'Desconto' },
                      { code: 'LOJA15', desc: '15% OFF em produtos selecionados', type: 'Promoção' }
                    ].map((coupon, i) => (
                      <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between group hover:border-orange-500/30 transition-all">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white">{coupon.code}</span>
                            <span className="text-[8px] px-1.5 py-0.5 bg-orange-500/10 text-orange-500 rounded uppercase font-bold">{coupon.type}</span>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1">{coupon.desc}</p>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(coupon.code);
                            alert('Cupom copiado!');
                          }}
                          className="p-2 hover:bg-orange-500/10 rounded-lg text-zinc-500 hover:text-orange-500 transition-all"
                        >
                          <Share2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-black text-sm transition-all">Ver Mais Cupons</button>
                </div>

              <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                <h3 className="text-lg font-black flex items-center gap-2"><Target size={20} className="text-emerald-500" /> Pixel de Rastreamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">Facebook Pixel</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <input type="text" defaultValue="FB-123456789" className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-xs outline-none" />
                  </div>
                  <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">Google Analytics</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <input type="text" defaultValue="G-ABC123DEF" className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-xs outline-none" />
                  </div>
                  <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">TikTok Pixel</span>
                      <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    </div>
                    <input type="text" placeholder="ID do Pixel" className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-xs outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Central de <span className="text-purple-500">Ajuda</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                    <h3 className="text-lg font-black">Tickets de Suporte</h3>
                    <div className="space-y-4">
                      {[
                        { id: 'TK-982', subject: 'Dúvida sobre comissão Shopee', status: 'Aberto', priority: 'Média', date: '12/03/2026' },
                        { id: 'TK-975', subject: 'Erro ao sincronizar produtos', status: 'Resolvido', priority: 'Alta', date: '10/03/2026' },
                      ].map(ticket => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-purple-500 transition-colors">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-mono text-zinc-500">#{ticket.id}</p>
                              <h4 className="text-sm font-bold">{ticket.subject}</h4>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Data</p>
                              <p className="text-xs font-bold">{ticket.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Aberto' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-black text-sm transition-all">Abrir Novo Ticket</button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-6">
                    <h3 className="text-lg font-black">Base de Conhecimento</h3>
                    <div className="space-y-3">
                      {['Como configurar o Pixel', 'Regras de Comissionamento', 'Tutorial: Link de Afiliado', 'Dicas de Viralização'].map((item, i) => (
                        <button key={i} className="w-full flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 hover:bg-white/5 transition-all text-left">
                          <span className="text-xs font-bold text-zinc-300">{item}</span>
                          <ChevronRight size={14} className="text-zinc-600" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-3xl shadow-xl space-y-4">
                    <h4 className="text-lg font-black">Suporte VIP 24/7</h4>
                    <p className="text-xs text-white/70 leading-relaxed">Como usuário Enterprise, você tem acesso prioritário ao nosso time de especialistas via WhatsApp.</p>
                    <button className="w-full py-3 bg-white text-purple-600 hover:bg-zinc-100 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2">
                      <MessageSquare size={16} />
                      Chamar no WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Configurações do <span className="text-purple-500">Sistema</span></h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black flex items-center gap-2"><Globe size={20} className="text-blue-500" /> Branding & Loja</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nome da Loja</label>
                        <input type="text" defaultValue="GUIA DOS ACHADINHOS" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cor Primária</label>
                        <div className="flex gap-3">
                          {['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'].map(color => (
                            <button key={color} className={`w-8 h-8 rounded-full border-2 ${color === '#7c3aed' ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: color }}></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-black flex items-center gap-2"><Shield size={20} className="text-purple-500" /> Integração Shopee API</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Shopee Affiliate ID</label>
                        <input type="text" defaultValue="123456789" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">App Key</label>
                        <input type="password" value="************************" readOnly className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">App Secret</label>
                        <input type="password" value="************************" readOnly className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none" />
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">API Conectada e Sincronizada</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded-3xl border border-white/5 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black flex items-center gap-2"><CreditCard size={20} className="text-emerald-500" /> Pagamentos & Taxas</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                        <div>
                          <p className="text-sm font-bold">Comissão Padrão</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Aplicada a novos produtos</p>
                        </div>
                        <span className="text-xl font-black text-purple-500">10%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                        <div>
                          <p className="text-sm font-bold">Saque Mínimo</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Para afiliados</p>
                        </div>
                        <span className="text-xl font-black text-white">R$ 50,00</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-purple-500/10 rounded-3xl border border-purple-500/20 space-y-4">
                    <h4 className="font-bold text-purple-400 flex items-center gap-2"><Zap size={16} /> Plano Enterprise</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">Você está utilizando a versão completa do sistema com suporte a múltiplos afiliados e sincronização automática.</p>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-black transition-all">Gerenciar Assinatura</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-[#18181b] p-6 rounded-3xl border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/5">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{trend}</span>
      </div>
      <div><p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</p><h3 className="text-2xl font-black mt-1">{value}</h3></div>
    </div>
  );
}
