import Layout from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelpPage() {
    return (
        <Layout>
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="text-center ">
                    <CardTitle className="text-4xl font-bold text-secondary-foreground ">Central de Ajuda</CardTitle>
                    <CardDescription className="text-xl text-secondary-foreground">Encontre respostas para suas dúvidas sobre o TaskManager</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-secondary-foreground mb-4">Perguntas Frequentes</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Como criar uma nova tarefa?</h3>
                                <p className="text-gray-600">
                                    Na página de tarefas, clique no botão "Nova Tarefa" e preencha o formulário com título, descrição
                                    (opcional), prioridade e prazo.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Como definir prioridades?</h3>
                                <p className="text-gray-600">
                                    Ao criar ou editar uma tarefa, você pode escolher entre 4 níveis de prioridade: Baixa, Média, Alta e
                                    Urgente.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Como marcar uma tarefa como concluída?</h3>
                                <p className="text-gray-600">
                                    Clique na checkbox ao lado do título da tarefa para marcá-la como concluída ou pendente.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Como excluir uma tarefa?</h3>
                                <p className="text-gray-600">
                                    Clique no ícone de lixeira no canto superior direito do card da tarefa. Uma confirmação será
                                    solicitada antes da exclusão.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-secondary-foreground mb-4">Suporte Técnico</h2>
                        <p className="text-gray-600 mb-4">Precisa de ajuda adicional? Entre em contato conosco:</p>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <strong>Email:</strong> suporte@taskmanager.com
                            </p>
                            <p className="text-gray-600">
                                <strong>Telefone:</strong> (11) 9999-9999
                            </p>
                            <p className="text-gray-600">
                                <strong>Horário de atendimento:</strong> Segunda a Sexta, 9h às 18h
                            </p>
                        </div>
                    </div>

                    <div className="bg-orange rounded-lg p-6 border ">
                        <h2 className="text-2xl text-secondary-foreground font-bold mb-4">Dicas de Produtividade</h2>
                        <ul className="space-y-2">
                            <li>• Use prioridades para focar nas tarefas mais importantes</li>
                            <li>• Defina prazos realistas para suas tarefas</li>
                            <li>• Revise suas tarefas regularmente</li>
                            <li>• Comemore quando completar suas tarefas!</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    )
}
