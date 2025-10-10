import AlertContainer from "@/presentation/components/ui/alert-container";
import AlertText from "@/presentation/components/ui/alert-text";
import { Button } from "@/presentation/components/ui/button";
import { ROUTES } from "@/shared/constants/router";
import { useNavigate } from "react-router-dom";
import StandardSubpage from "../components/ui/standart-subpage";

export default function CPAInformationPage() {

    const navigate = useNavigate();

    return (
        <StandardSubpage title="Comissão Própria de Avaliação">
            <p>Senhores Acadêmicos.</p> <br />
            <p>Conforme praxe desta Instituição de Ensino, colocamos à disposição dos integrantes de nossa Comunidade Acadêmica um questionário sobre os mais variados temas ligados ao ensino superior.</p> <br />
            <p>As alterações e melhorias realizadas nas mais diversas áreas da Faculdade decorrem das importantes informações obtidas com os alunos, por este mesmo instrumento, ao longo dos últimos anos.</p> <br />
            <p>Assim, mais uma vez solicitamos suas valiosas contribuições para o nosso constante processo de aperfeiçoamento, mediante o registro de suas sinceras e responsáveis impressões sobre os assuntos acadêmicos questionados.</p><br />
            <p>A CPA assegura que as respostas são absolutamente confidenciais e sigilosas e as respostas serão utilizadas exclusivamente para o processo da avaliação institucional.</p><br />
            <p>Sua participação é muito importante!</p> <br />

            <AlertText text="IMPORTANTE: Cada pergunta será salva individualmente, possibilitando o preenchimento parcial do questionário. As questões serão marcada com um símbolo de verificação, ou seja, não haverá botão salvar no final do formulário, você poderá continuar respondendo o questionário outra hora sem se preocupar em perder o que você já respondeu." />
            <AlertContainer>
                <AlertText text="ANTES DE CONTINUAR VERIFIQUE SE SEU NAVEGADOR ESTÁ ATUALIZADO!" />
            </AlertContainer>

            <Button className="mt-4 w-full md:w-fit" onClick={() => navigate(ROUTES.cpaForm)}>
                Estou ciente e quero iniciar Questionário
            </Button>

        </StandardSubpage>
    )
}