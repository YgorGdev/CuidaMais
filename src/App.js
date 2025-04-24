import React from "react";
import * as Components from './Components';

function App() {
    const [signIn, toggle] = React.useState(true);
    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Criar Conta</Components.Title>
                    <Components.Input type='text' placeholder='Nome' className="rounded-md shadow-md" />
                    <Components.Input type='email' placeholder='Email' className="rounded-md shadow-md" />
                    <Components.Input type='password' placeholder='Senha' className="rounded-md shadow-md" />
                    <Components.Button className="mt-3 shadow-md">Cadastrar</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Entrar</Components.Title>
                    <Components.Input type='email' placeholder='Email' className="rounded-md shadow-md" />
                    <Components.Input type='password' placeholder='Senha' className="rounded-md shadow-md" />
                    <Components.Anchor href='#' className="text-sm text-gray-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full">Esqueceu sua senha?</Components.Anchor>
                    <Components.Button className="mt-3 shadow-md">Entrar</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Bem-vindo de volta!</Components.Title>
                        <Components.Paragraph>
                            Para continuar conectado conosco, faça login com suas informações pessoais
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Entrar
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Não tem uma conta?</Components.Title>
                        <Components.Paragraph>
                           Cadastre-se
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Cadastrar
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    )
}

export default App;
