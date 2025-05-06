import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				litebrite: {
					background: '#1A1F2C',
					white: '#c5c5c5',
					black: '#000000',
					'crimson-red': '#E63946',
					'deep-orange': '#F77F00',
					'gold-yellow': '#FCCA46',
					'lime-green': '#90BE6D',
					'turquoise': '#43AA8B',
					'sky-blue': '#4D9DE0',
					'royal-purple': '#8338EC',
					'hot-pink': '#FF006E',
				}
			},
			boxShadow: {
				'glow-white': '0 0 10px 2px rgba(197, 197, 197, 0.7)',
				'glow-black': '0 0 10px 2px rgba(0, 0, 0, 0.7)',
				'glow-crimson-red': '0 0 10px 2px rgba(230, 57, 70, 0.7)',
				'glow-deep-orange': '0 0 10px 2px rgba(247, 127, 0, 0.7)',
				'glow-gold-yellow': '0 0 10px 2px rgba(252, 202, 70, 0.7)',
				'glow-lime-green': '0 0 10px 2px rgba(144, 190, 109, 0.7)',
				'glow-turquoise': '0 0 10px 2px rgba(67, 170, 139, 0.7)',
				'glow-sky-blue': '0 0 10px 2px rgba(77, 157, 224, 0.7)',
				'glow-royal-purple': '0 0 10px 2px rgba(131, 56, 236, 0.7)',
				'glow-hot-pink': '0 0 10px 2px rgba(255, 0, 110, 0.7)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			backgroundSize: {
				'size-200': '200% 200%',
			},
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				ribeye: ['Bungee', 'cursive'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px 1px rgba(255, 255, 255, 0.5)' },
					'50%': { boxShadow: '0 0 12px 4px rgba(255, 255, 255, 0.8)' },
				},
				'gradient-xy': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'gradient-xy': 'gradient-xy 15s ease infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
