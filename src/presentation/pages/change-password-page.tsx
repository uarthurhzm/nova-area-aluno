import { Button } from "@/presentation/components/ui/button";
import Column from "@/presentation/components/ui/Column";
import Flex from "@/presentation/components/ui/flex";
import { Form } from "@/presentation/components/ui/form";
import FormPassword from "@/presentation/components/ui/form-password-input";
import PasswordInput from "@/presentation/components/ui/password-input";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { CloudUpload, Trash } from "lucide-react";
import { useState } from "react";
import StandardSubpage from "../components/ui/standart-subpage";
import { useToast } from "../contexts/ToastContext";
import { useChangePasswordForm } from "../hooks/use-change-password-form";
import { useStudentVerifyPassword } from "../hooks/use-student-verify-password";

export default function ChangePasswordPage() {

    const { verifyPassword } = useStudentVerifyPassword();
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [actualPassword, setActualPassword] = useState("");
    const { showError } = useToast();

    const { form, handleSubmit } = useChangePasswordForm(() => {
        setActualPassword("");
        setPasswordsMatch(false);
    });
    return (
        <StandardSubpage title="Alterar senha" withSpace={true}>
            <div>
                Sua senha é numérica, utilize de 5 a 10 caracteres.
                Evite utilizar datas, telefones, números de documentos pessoais, e sequências simples.
            </div>

            <PasswordInput
                label="Senha atual"
                placeholder="Digite sua senha atual"
                className="rounded-r-none"
                value={actualPassword}
                onChange={(e) => setActualPassword(e.currentTarget.value)}
                minLength={5}
                maxLength={10}
                onBlur={async (e) => {
                    const result = await verifyPassword(e.currentTarget.value)
                    setPasswordsMatch(result)
                    if (!result) {
                        showError("Senha atual incorreta. Tente novamente.")
                    }
                }}
            />
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    <Flex>
                        <Column size={6}>
                            <FormPassword
                                autoComplete="new-password"
                                control={form.control}
                                name="newPassword"
                                label="Nova senha"
                                placeholder="Digite sua nova senha"
                                disabled={!passwordsMatch}
                            />
                        </Column>
                        <Column size={6}>
                            <FormPassword
                                autoComplete="new-password"
                                control={form.control}
                                name="confirmPassword"
                                label="Confirmar nova senha"
                                placeholder="Confirme sua nova senha"
                                disabled={!passwordsMatch}
                            />
                        </Column>
                    </Flex>
                    <Flex className="justify-end">
                        <Button
                            type="button"
                            variant={"destructive"}
                            disabled={!passwordsMatch}
                            onClick={() => {
                                form.reset();
                                setPasswordsMatch(false);
                            }}>
                            <Trash /> Cancelar
                        </Button>
                        <SubmitButton form={form} isToDisable={!passwordsMatch} text="Alterar senha" Icon={CloudUpload} />

                    </Flex>
                </form>
            </Form>

        </StandardSubpage>
    )
}