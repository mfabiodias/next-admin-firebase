const dt = new Date();

export default Object.freeze({
  SYSADM: {
    BUSSINESS: {
      NAME: 'Empresa X',
      DATE_SINCE: 2020,
      DATE_NOW: dt.getFullYear(),
      ALL_RIGHT: `© ${dt.getFullYear()} Empresa X - All Rights reserved.`,
    },
    DEV: {
      NAME: 'FMDSystem',
      SITE: 'www.fmdsystem.com.br',
    },
  },
});
