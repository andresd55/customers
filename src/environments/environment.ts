import { b2cPolicies } from 'src/app/auth-config';

export const environment = {
  production: false,
  max_file_size: 12,
  pageLenght: 10,
  baseUrl: {
    url: 'https://apimanagementfinotex.azure-api.net/',
  },
  methods: {
    Sketch: "SalesDev/api/V1",
    Shared: "SharedDev/api/V1",
    Product: "SalesDev/api/V1",
    Sales: "SalesDev/api/V1",
    Customer: "FinancialDev/api/V1",
    MasterSales: "SalesDev/api/V1",
    MasterProduct: "SalesDev/api/V1",
    NotificationPush: "UtilsDev/api/V1",
    Brand: "BrandDev/api/V1",
    ShippingMasters: "ShippingMastersDev/api/V1",
    CommonMasters: "FinancialDev/api/V1",
    ProductionMasters: "ProductionMastersDev/api/V1",
    ApMaster: "FinancialDev/api/V1",
    InventoryMasters: "inventorymastersdev/api/V1"
  },

  config: {
    urlNotifications:
      'https://finotexfunctionsnotificationspushdev.azurewebsites.net/api/notifications/',
  },
  authB2c: {
    clientId: 'e8529ad6-7364-454a-afac-6c74edc7d5d3', // This is the ONLY mandatory field that you need to supply.
    authority:
      'https://FinotexB2C.b2clogin.com/FinotexB2C.onmicrosoft.com/B2C_1_Finotex_SignIn/', // Defaults to "https://login.microsoftonline.com/common"
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: '/',
    navigateToLoginRequestUrl: true,
    validateAuthority: false,
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  },
  auth: {
    clientId: '98c68b8e-0d50-4961-b352-5cd5040b1e1e',
    authority:
      'https://login.microsoftonline.com/171cc8e3-fbee-43e4-b757-b08386005972',
    redirectUri: '/',
    validateAuthority: false,
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  },
  statusDefaultArtWorksHistory: [1, 2, 3, 6],
  technicalDataLines: {
    heattranferRollo: 52,
    tejidoOrilloCortado: 89,
    estampados: 66,
    flexoPapelTextil: 36,
    flexoPapelNoTextil: 36,
    heatTranferPiezas: 55,
    heatTransferLaser: 0,
    thermal: 68,
    reatasyPretinas: 0,
    mascarillasTejidas: 67,
    estampaciónSublimacion: 78,
    sinteticaScreen: 79,
    sintetico: 0,
    estampadoScreen: 83,
    troquelado: 81,
    sinteticoOtros: 82,
    kitOffset: 86,
    kitEstampadoSublimacion: 88,
    kitOrilloMexico: 89,
    cortado: 0,
    kitHeattransfer: 87,
    kitFlexoMexico: 91,
    mezclasyTintas: 0,
    offSet: 77,
    telas: 63,
  },
};
