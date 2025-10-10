import { Checkbox } from '@/presentation/components/ui/checkbox';
import { Form } from '@/presentation/components/ui/form';
import FormInput from '@/presentation/components/ui/form-input';
import { Label } from '@/presentation/components/ui/label';
import SubmitButton from '@/presentation/components/ui/submit-button';
import logo_mini from '@/shared/assets/images/logos/logo-azul-login.png';
import logo_login from '@/shared/assets/images/logos/logo-login.png';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import Flex from '../components/ui/flex';
import FormInputNumber from '../components/ui/form-number-input';
import { useLoginForm } from '../hooks/use-login-form';
import { useRecoveryPasswordForm } from '../hooks/use-recovery-password-form';
import { useTheme } from '../hooks/use-theme';

export default function LoginPage() {
	const [rememberMe, setRememberMe] = useState(false);
	const { form, handleSubmit } = useLoginForm(rememberMe);
	const { setLightTheme } = useTheme();
	const searchParams = new URLSearchParams(window.location.search);
	const login = searchParams.get('login');
	const pass = searchParams.get('pass');

	useEffect(() => {
		setLightTheme();
	}, [setLightTheme]);

	useEffect(() => {
		if (login && pass) {
			form.setValue('login', login);
			form.setValue('password', pass);
			handleSubmit();
		}
	}, [login, pass]);

	return (
		<div className="w-full h-full min-h-screen min-w-screen bg-black " >
			<div className="flex">
				<div className="w-full md:w-[40vw] min-h-full h-screen bg-[#f9fafc] flex flex-col py-7 px-8 md:py-14 md:px-16 items-center gap-8">
					<img src={logo_mini} alt="Logo" className='w-64' />
					<h1 className="text-3xl font-bold mb-4 text-[#0A488C]">Área do Aluno</h1>
					<Form {...form}>
						<form onSubmit={handleSubmit} className="space-y-4 w-full">
							<FormInputNumber
								control={form.control}
								name="login"
								label="Login"
								placeholder="Identificação de usuário"
								inputMode='numeric'
							/>
							<FormInput
								control={form.control}
								name="password"
								label="Senha"
								placeholder="Senha"
								type="password"
							/>
							<Flex className='mb-8 justify-between'>
								<div className='flex items-center gap-2'>
									<Checkbox
										id='remember-me'
										checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
									<Label htmlFor='remember-me'>Lembrar</Label>
								</div>
								<RecoveryPasswordDialog />
							</Flex>
							<SubmitButton
								form={form}
								text="Acessar"
								className='w-full py-8 font-bold text-xl bg-[#093e77]'
								isToDisable={false}
							/>

						</form>
					</Form>
				</div>
				<div className="hidden md:flex justify-center w-full items-center">
					<div className="h-full bg-black flex justify-center items-center">
						<img className='w-full h-full object-cover' src={logo_login} alt="Logo" />
					</div>
				</div>

			</div>
		</div >
	)
}

const RecoveryPasswordDialog = () => {
	const { form, handleSubmit } = useRecoveryPasswordForm()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<span className="text-sm text-[#8DBFDF] hover:underline cursor-pointer">Esqueceu a senha ou primeiro acesso?</span>
			</DialogTrigger>
			<DialogContent aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Problemas com login?</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<small>
						Para recuperar seu login e senha, digite o número do seu CPF. Que vamos enviar os dados de acesso para o seu e-mail.
					</small>
					<form onSubmit={handleSubmit} className="space-y-4 w-full bg-gray-50 p-4 rounded">
						<FormInput
							control={form.control}
							name="cpf"
							label="CPF"
							placeholder="Digite seu CPF"
							minLength={14}
							maxLength={14}
							onChange={(e) => {
								const value = e.currentTarget.value;
								const formattedValue = value
									.replace(/\D/g, '')
									.replace(/(\d{3})(\d)/, '$1.$2')
									.replace(/(\d{3})(\d)/, '$1.$2')
									.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
								form.setValue('cpf', formattedValue);
							}}
						/>
						<div className="text-end">
							<Button
								type='button'
								onClick={handleSubmit}
								disabled={form.formState.isSubmitting}
							>
								<Search className='mr-2' size={16} />
								{form.formState.isSubmitting ? 'Pesquisando...' : 'Pesquisar'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}