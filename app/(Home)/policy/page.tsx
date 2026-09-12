import React from "react";
import Link from "next/link";

export const metadata = {
    title: "Datenschutzerklärung | Vibez",
    description: "Datenschutzerklärung für die Nutzung der App Vibez",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white py-12 md:py-16 text-zinc-900">
            <div className="container mx-auto px-4 max-w-3xl">
                
                {/* Document Title Header */}
                <div className="border-b border-zinc-200 pb-8 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                        Datenschutzerklärung
                    </h1>
                    <p className="text-zinc-500 mt-2 text-base">
                        für die Nutzung der App <strong>Vibez</strong>
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                        Stand: 11.09.2026
                    </p>
                </div>

                {/* Content Document */}
                <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-700">

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Verantwortliche Stelle</h2>
                        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-1">
                            <p><strong>Firmenname:</strong> X-Auktionata.GmbH</p>
                            <p><strong>Adresse:</strong> Hasenweg 11, 5034 Suhr</p>
                            <p><strong>E-Mail:</strong> <a href="mailto:x.auktionata@gmail.com" className="text-blue-600 hover:underline">x.auktionata@gmail.com</a></p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Erhobene Daten</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">2.1 Bei Registrierung des Kunden</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Name oder Pseudonym</li>
                                    <li>E-Mail-Adresse</li>
                                    <li>Passwort (verschlüsselt)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">2.2 Bei Nutzung der App</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Geräteinformationen</li>
                                    <li>App-Nutzung (anonymisiert)</li>
                                    <li>Zeitpunkt & Dauer der Nutzung</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">2.3 Zahlungsdaten</h3>
                                <p>
                                    Zahlungen werden über externe Zahlungsanbieter abgewickelt. Der Anbieter hat <strong>keinen Zugriff auf Kreditkarten- oder Zahlungsdaten</strong>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Zweck der Datenverarbeitung</h2>
                        <p className="mb-2">Die Daten werden verwendet zur:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Bereitstellung der App</li>
                            <li>Abwicklung von Zahlungen</li>
                            <li>Verbesserung der App-Funktionalität</li>
                            <li>Missbrauchsprävention</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Drittanbieter und technische Dienstleister</h2>
                        <div className="space-y-3">
                            <p>
                                Für den Betrieb, die Weiterentwicklung und die Bereitstellung der Vibez-Plattform arbeiten wir mit verschiedenen externen Dienstleistern zusammen. Dabei können Personendaten im erforderlichen Umfang und für die jeweiligen Zwecke bearbeitet werden. Soweit erforderlich, schliessen wir entsprechende Vereinbarungen zur Auftragsbearbeitung ab.
                            </p>

                            <p><strong>Stripe:</strong> Für Zahlungen und Abonnements verwenden wir Stripe. Zahlungsdaten werden grundsätzlich direkt durch Stripe verarbeitet. Vibez erhält nicht die vollständigen Zahlungsdaten. Eine Bearbeitung ausserhalb der Schweiz kann möglich sein.</p>
                            
                            <p><strong>Firebase:</strong> Für technische Funktionen wie Authentifizierung, Fehleranalyse, App-Performance und Benachrichtigungen verwenden wir Firebase von Google. Dabei können je nach aktivierten Diensten technische Daten wie Geräteinformationen, IP-Adresse, Nutzungs- und Diagnosedaten verarbeitet werden.</p>
                            
                            <p><strong>Google Maps:</strong> Für Karten, Standorte und gegebenenfalls die Suche nach Restaurants verwenden wir Google Maps. Dabei können Standort-, IP- und Geräteinformationen an Google übermittelt werden. Standortdaten werden grundsätzlich nur bei erteilter Geräteberechtigung verwendet.</p>
                            
                            <p><strong>Brevo:</strong> Für E-Mail-Kommunikation wie Transaktions-, Support- und gegebenenfalls Marketing-E-Mails verwenden wir Brevo. Dabei können insbesondere Name, E-Mail-Adresse und weitere für die Kommunikation erforderliche Daten verarbeitet werden.</p>
                            
                            <p><strong>Hetzner:</strong> Für Hosting, Serverbetrieb und technische Infrastruktur verwenden wir Hetzner. Dabei können die für den Betrieb der Plattform erforderlichen Personen- und technischen Daten auf den genutzten Servern verarbeitet und gespeichert werden.</p>

                            <div className="pt-2">
                                <h3 className="font-semibold text-zinc-900 mb-1">Datenübermittlung ins Ausland</h3>
                                <p>
                                    Einzelne Dienstleister können Personendaten ausserhalb der Schweiz bearbeiten oder an ausländische Unterauftragnehmer übermitteln. Dies erfolgt nur im Rahmen der geltenden Datenschutzbestimmungen und, soweit erforderlich, unter Verwendung geeigneter Garantien.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">Weitere Dienstleister</h3>
                                <p>
                                    Bei Bedarf können weitere technische Dienstleister eingesetzt werden. Personendaten werden dabei nur im erforderlichen Umfang weitergegeben und angemessen geschützt.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Daten von Partnerrestaurants und deren Kontaktpersonen</h2>
                        <div className="space-y-3">
                            <p>
                                Vibez bietet auf seiner Website und über seine Plattform Dienstleistungen für Restaurants und andere gastronomische Betriebe an. Im Rahmen der Registrierung, Kontaktaufnahme und Zusammenarbeit mit einem Partnerrestaurant können auch Personendaten von Inhabern, Geschäftsführern, Mitarbeitenden oder sonstigen Kontaktpersonen des Restaurants bearbeitet werden.
                            </p>
                            
                            <p className="font-semibold">Dabei können insbesondere folgende Daten bearbeitet werden:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Name und Vorname der Kontaktperson</li>
                                <li>Funktion bzw. Position im Restaurant</li>
                                <li>Name und Anschrift des Restaurants bzw. Unternehmens</li>
                                <li>geschäftliche E-Mail-Adresse</li>
                                <li>geschäftliche Telefonnummer</li>
                                <li>Angaben zu den angebotenen Deals, Rabatten und Leistungen</li>
                                <li>Angaben zu Öffnungszeiten, Standort, Speisekarte und weiteren Restaurantinformationen</li>
                                <li>Kommunikations- und Supportdaten</li>
                                <li>Angaben zu Abrechnungen, Provisionen und Zahlungen, soweit diese für die Geschäftsbeziehung erforderlich sind</li>
                                <li>technische Daten zur Nutzung des Restaurantbereichs und der Vibez-Plattform</li>
                            </ul>

                            <p className="font-semibold">Die Bearbeitung dieser Daten erfolgt insbesondere zur:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Einrichtung und Verwaltung des Restaurantkontos</li>
                                <li>Prüfung und Verwaltung der Partnerschaft mit Vibez</li>
                                <li>Veröffentlichung und Verwaltung des Restaurantprofils auf der Vibez-Plattform</li>
                                <li>Verwaltung von Deals, Rabatten und Angeboten</li>
                                <li>Kommunikation mit dem Partnerrestaurant</li>
                                <li>Bearbeitung von Support- und Serviceanfragen</li>
                                <li>Abrechnung und Abwicklung von Zahlungen und Provisionen</li>
                                <li>Gewährleistung der Sicherheit und des ordnungsgemässen Betriebs der Plattform</li>
                                <li>Weiterentwicklung und Verbesserung der Vibez-Dienstleistungen</li>
                            </ul>

                            <p>
                                Soweit es sich bei den Restaurantangaben um Daten einer juristischen Person handelt, gelten diese Angaben grundsätzlich nicht als Personendaten nach dem Schweizer Datenschutzgesetz. Personendaten von natürlichen Personen, insbesondere von Inhabern, Geschäftsführern, Mitarbeitenden und Kontaktpersonen, werden hingegen entsprechend den geltenden Datenschutzbestimmungen bearbeitet.
                            </p>
                            <p>
                                Restaurantdaten und Kontaktdaten können innerhalb von Vibez für die Durchführung und Verwaltung der Geschäftsbeziehung verwendet werden. Eine Weitergabe an externe Dienstleister erfolgt nur, soweit dies für den Betrieb der Plattform, die Kommunikation, die Zahlungsabwicklung, das Hosting, die Sicherheit oder andere notwendige Dienstleistungen erforderlich ist oder eine gesetzliche Verpflichtung besteht.
                            </p>
                            <p>
                                Partnerrestaurants beziehungsweise deren betroffene Kontaktpersonen haben im Rahmen der gesetzlichen Bestimmungen insbesondere das Recht, Auskunft über die über sie bearbeiteten Personendaten zu verlangen sowie gegebenenfalls deren Berichtigung oder Löschung zu verlangen.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Standortdaten</h2>
                        <p>
                            Sofern vom Nutzer erlaubt, können <strong>ungefähre Standortdaten</strong> verwendet werden, um Restaurants in der Nähe anzuzeigen.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Weitergabe von Daten</h2>
                        <p className="mb-2">Eine Weitergabe erfolgt nur:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>an technische Dienstleister (Hosting, Payment, CRM System usw.)</li>
                            <li>wenn gesetzlich vorgeschrieben</li>
                        </ul>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Datenspeicherung</h2>
                        <p className="mb-2">Daten werden nur so lange gespeichert, wie:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                            <li>ein Nutzerkonto besteht</li>
                            <li>gesetzliche Pflichten es verlangen</li>
                        </ul>
                        <p>Nach Löschung des Kontos werden Daten gelöscht oder anonymisiert.</p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Rechte der Nutzer</h2>
                        <p className="mb-2">Nutzer haben das Recht auf:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Auskunft</li>
                            <li>Berichtigung</li>
                            <li>Löschung</li>
                            <li>Einschränkung der Verarbeitung</li>
                        </ul>
                        <p>Anfragen an: <a href="mailto:x.auktionata@gmail.com" className="text-blue-600 hover:underline">x.auktionata@gmail.com</a></p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">10. Datensicherheit</h2>
                        <p>
                            Der Anbieter trifft technische und organisatorische Maßnahmen zum Schutz der Daten. Ein vollständiger Schutz kann jedoch nicht garantiert werden.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">11. Änderungen</h2>
                        <p className="mb-1">Diese Datenschutzerklärung kann jederzeit angepasst werden.</p>
                        <p className="text-zinc-500 italic">Die jeweils aktuelle Version ist in der App einsehbar.</p>
                    </section>

                    {/* Footer Nav Links */}
                    <div className="pt-8 border-t border-zinc-200 flex justify-between items-center text-sm">
                        <Link href="/terms" className="text-blue-600 font-medium hover:underline">
                            Zu den AGB (Terms) →
                        </Link>
                        <Link href="/" className="text-zinc-500 hover:text-zinc-900">
                            Zurück zur Startseite
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
