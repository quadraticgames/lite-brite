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
					red: '#FF5252',
					orange: '#FF9D42',
					yellow: '#FFEB3B',
					green: '#4CAF50',
					blue: '#2196F3',
					purple: '#9C27B0',
					pink: '#FF4081',
					white: '#FFFFFF'
				}
			},
			boxShadow: {
				'glow-red': '0 0 10px 2px rgba(255, 82, 82, 0.7)',
				'glow-orange': '0 0 10px 2px rgba(255, 157, 66, 0.7)',
				'glow-yellow': '0 0 10px 2px rgba(255, 235, 59, 0.7)',
				'glow-green': '0 0 10px 2px rgba(76, 175, 80, 0.7)',
				'glow-blue': '0 0 10px 2px rgba(33, 150, 243, 0.7)',
				'glow-purple': '0 0 10px 2px rgba(156, 39, 176, 0.7)',
				'glow-pink': '0 0 10px 2px rgba(255, 64, 129, 0.7)',
				'glow-white': '0 0 10px 2px rgba(255, 255, 255, 0.7)',
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
