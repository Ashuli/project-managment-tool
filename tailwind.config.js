module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	purge: [],
	theme: {
		extend: {
			spacing: {
				px: '1px',
				0: '0',
				1: '0.25rem',
				'1-25': '0.3125rem',
				'1-5': '0.375rem',
				2: '0.5rem',
				3: '0.75rem',
				4: '1rem',
				5: '1.25rem',
				6: '1.5rem',
				7: '1.75rem',
				8: '2rem',
				10: '2.5rem',
				12: '3rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				32: '8rem',
				40: '10rem',
				48: '12rem',
				56: '14rem',
				64: '16rem',
				72: '18rem',
				80: '20rem',
				88: '22rem'
			},
			colors: {
				transparent: 'transparent',
				black: '#000',
				white: '#fff',
				primary: '#db4733',
				success: '#0B875B',
				secondary: '#F4F5F7',
				tertiary: '#e6e9f0',
				textDarkest: '#172b4d',
				textDark: '#42526E',
				textMedium: '#5E6C84',
				textLight: '#8993a4',
				textLink: '#0052cc',
				textLogo: '#DEEBFF',

				backgroundDarkPrimary: '#db4733',
				backgroundMedium: '#dfe1e6',
				backgroundLight: '#ebecf0',
				backgroundLightest: '#F4F5F7',
				backgroundLightPrimary: '#D2E5FE',
				backgroundLightSuccess: '#E4FCEF',

				// borderLightest: '#dfe1e6',
				// borderLight: '#C1C7D0',
				// borderInputFocus: '#4c9aff'
      },
      fontSize: {
        xs: '0.75rem',
        13: '0.8125rem',
        sm: '0.875rem',
        15: '0.9375rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      fontWeight: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      }
		}
	},
	variants: {},
	plugins: []
};