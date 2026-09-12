import React from "react";
import Link from "next/link";

export const metadata = {
    title: "Allgemeine Geschäftsbedingungen (AGB) | Vibez",
    description: "Allgemeine Geschäftsbedingungen (AGB) für die Nutzung der App Vibez",
};

export default function TermsPage() {
    return (
        <div className="bg-white py-12 md:py-16 text-zinc-900">
            <div className="container mx-auto px-4 max-w-3xl">
                
                {/* Document Title Header */}
                <div className="border-b border-zinc-200 pb-8 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                        Allgemeine Geschäftsbedingungen (AGB)
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
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Gegenstand der App</h2>
                        <p className="mb-2">
                            Die App <strong>Vibez</strong> ist eine digitale Entdecker- und Vorteilsplattform für Restaurantbesucher. Sie ermöglicht Nutzern, teilnehmende Restaurants zu entdecken und dort Rabatte oder Sonderkonditionen zu nutzen.
                        </p>
                        <p className="font-semibold text-zinc-900">
                            Der Anbieter erbringt ausschließlich eine Vermittlungs- und Informationsdienstleistung.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Anbieter</h2>
                        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-1">
                            <p><strong>X-Auktionata.GmbH</strong></p>
                            <p>Adresse: Hasenweg 11, 5034 Suhr</p>
                            <p>E-Mail: <a href="mailto:x.auktionata@gmail.com" className="text-blue-600 hover:underline">x.auktionata@gmail.com</a></p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Vertragsverhältnisse</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Zwischen dem Anbieter (X-Auktionata.GmbH) und dem Nutzer besteht ein <strong>Nutzungsvertrag über die App</strong>.</li>
                            <li>Zwischen Nutzer und Restaurant entsteht ein <strong>separater Vertrag</strong> über die jeweilige Leistung.</li>
                            <li>Zwischen Werbepartner entsteht ein <strong>separater Vertrag</strong> über die jeweiligen Leistungen.</li>
                            <li>Der Anbieter ist <strong>nicht Vertreter oder Erfüllungsgehilfe</strong> der Restaurants. Er ist Vermittler und bietet Informationsdienstleistung.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Registrierung & Nutzerkonto</h2>
                        <p className="mb-2">Für die Nutzung kostenpflichtiger Inhalte ist ein Nutzerkonto erforderlich.</p>
                        <p className="mb-2">Der Nutzer verpflichtet sich:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>wahrheitsgemäße Angaben zu machen</li>
                            <li>Zugangsdaten geheim zu halten</li>
                            <li>keinen Missbrauch zu betreiben</li>
                        </ul>
                        <p className="font-semibold text-red-600">
                            Der Anbieter ist berechtigt, Konten bei Verstößen sofort zu sperren oder zu löschen.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Rabattlogik & Kategorien</h2>
                        <p className="mb-2">
                            Partnerrestaurants bieten mindestens einen Rabatt an, der einer der folgenden Kategorien zugeordnet ist:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Prozent</li>
                            <li>2 für 1</li>
                            <li>Fixer Discount</li>
                            <li>Free Item</li>
                        </ul>
                        <p className="mb-3 italic text-zinc-600">
                            Die Kategorien dienen ausschließlich der Orientierung. Sie stellen keine Garantie für eine konkrete Ersparnis dar.
                        </p>
                        <p className="mb-1 font-medium">Rabatte können:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>zeitlich begrenzt sein</li>
                            <li>an Bedingungen geknüpft sein</li>
                            <li>jederzeit geändert oder beendet werden</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Keine Garantie auf Rabatte</h2>
                        <p className="mb-2">Der Anbieter garantiert nicht, dass:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                            <li>ein Rabatt jederzeit verfügbar ist</li>
                            <li>ein Restaurant den Rabatt tatsächlich gewährt</li>
                            <li>alle gelisteten Restaurants aktiv teilnehmen</li>
                        </ul>
                        <p className="font-semibold mb-1">Der Anbieter haftet nicht bei:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Ablehnung eines Rabatts</li>
                            <li>Missverständnissen vor Ort</li>
                            <li>Schließung eines Restaurants oder falsche Angaben über die Öffnungszeiten bei einem Partnerbetrieb.</li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Rabatt-Nutzungsregeln</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Pro Besuch kann ein Rabatt <strong>einmal eingelöst werden</strong>.</li>
                            <li>Keine Kombination mit anderen Aktionen, sofern nicht ausdrücklich erlaubt.</li>
                            <li>Missbrauch führt zur <strong>Sperrung des Kontos</strong>.</li>
                            <li>Das Restaurant kann bei berechtigtem Verdacht Rückfrage halten.</li>
                        </ul>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Pässe & Abonnements</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">8.1 Pass-Modelle</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Monatsabo</li>
                                    <li>Jahrespass</li>
                                    <li>2 Jahrespass</li>
                                </ul>
                                <p className="text-sm text-zinc-500 mt-1">Aktueller Preis wird vor Abschluss in der App angezeigt.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">8.2 Abonnement</h3>
                                <ul className="list-disc pl-5 space-y-1 mb-2">
                                    <li>automatische Verlängerung</li>
                                    <li>Kündigung jederzeit bis spätestens 24h vor Ablauf</li>
                                    <li>keine anteilige Rückerstattung</li>
                                </ul>
                                <p><strong>Auto-Renewal-Hinweis:</strong> Das Abonnement verlängert sich automatisch um einen weiteren Abrechnungszeitraum, sofern es nicht mindestens 24 Stunden vor Ablauf gekündigt wird. Die Belastung erfolgt über das hinterlegte App-Store-Konto.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">8.3 Zahlungsbedingungen</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Preise verstehen sich inkl. gesetzlicher Steuern</li>
                                    <li>Zahlung erfolgt im Voraus</li>
                                    <li>Kein Anspruch auf Rückerstattung bei Nichtnutzung</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">8.4 Verzicht auf Widerrufsrecht</h3>
                                <p>
                                    Mit dem Kauf eines Passes oder Abonnements erklärt sich der Nutzer ausdrücklich damit einverstanden, dass die Nutzung <strong>sofort beginnt</strong>. Der Nutzer verzichtet damit auf ein gesetzliches Widerrufsrecht, soweit zulässig.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Partnerbetriebe</h2>
                        <p className="mb-3">Mit der Registrierung als Partnerrestaurant akzeptiert der Partner folgende Bedingungen:</p>
                        <ol className="list-decimal pl-5 space-y-2 mb-4">
                            <li>Das Restaurant verpflichtet sich, mindestens einen aktiven Rabatt für App-Nutzer anzubieten, der den Wert von einem Monatsabo auf Vibez übersteigt.</li>
                            <li>Rabatte sind während der angegebenen Öffnungszeiten einzulösen.</li>
                            <li>Einschränkungen (Zeit, Produkte, Anzahl) müssen vorab in der App angegeben werden.</li>
                            <li>Rabatte dürfen nicht willkürlich verweigert werden.</li>
                            <li>Das Servicepersonal ist entsprechend zu instruieren.</li>
                            <li>Der Anbieter übernimmt keine Haftung für Umsätze, Gästeaufkommen oder Missbrauch.</li>
                            <li>Der Anbieter darf das Restaurant jederzeit aus der App entfernen.</li>
                            <li>Es besteht keine Exklusivität.</li>
                            <li>Änderungen der Angebote sind dem Anbieter unverzüglich mitzuteilen.</li>
                            <li>Weitere Vertrag Details sind im persönlichen separatem Vertrag zwischen den Parteien geregelt.</li>
                        </ol>

                        <div className="mt-4 space-y-3">
                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">9.1 Zukünftige Monetisierung</h3>
                                <p className="mb-1">Der Anbieter behält sich vor, zukünftig kostenpflichtige Leistungen für Partnerrestaurants anzubieten, z. B.:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Premium-Platzierung</li>
                                    <li>Featured Listings</li>
                                    <li>Monatliche Partnergebühren</li>
                                </ul>
                                <p className="text-xs text-zinc-500 mt-1">Bestehende Partner werden vor Einführung informiert.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-zinc-900 mb-1">9.2 Haftungsfreistellung</h3>
                                <p className="mb-1">Der Partner stellt den Anbieter vollständig von sämtlichen Ansprüchen Dritter frei, die aus oder im Zusammenhang mit folgenden Punkten entstehen:</p>
                                <ul className="list-disc pl-5 space-y-1 mb-2">
                                    <li>verweigerte oder falsch gewährte Rabatte</li>
                                    <li>Verletzung gesetzlicher Vorschriften</li>
                                    <li>Mängel an Speisen oder Dienstleistungen</li>
                                    <li>falsche Angaben des Restaurants</li>
                                </ul>
                                <p className="text-xs text-zinc-600">Die Freistellung umfasst auch Anwalts- und Verfahrenskosten.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">10. Technische Verfügbarkeit</h2>
                        <p className="mb-2">Der Anbieter übernimmt keine Gewähr für:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                            <li>ständige Erreichbarkeit</li>
                            <li>Fehlerfreiheit</li>
                            <li>Datenverlust</li>
                        </ul>
                        <p className="text-sm italic text-zinc-500">Wartungen oder technische Störungen sind jederzeit möglich.</p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">11. Missbrauch & Sanktionen</h2>
                        <p className="mb-2">Untersagt sind insbesondere:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                            <li>Mehrfachnutzung eines Rabatts entgegen Bedingungen</li>
                            <li>Weitergabe von Accounts</li>
                            <li>Manipulation oder Täuschung</li>
                        </ul>
                        
                        <h3 className="font-bold text-zinc-900 mb-2">Sofortige Sperrung ohne Rückerstattung</h3>
                        <p className="mb-2">
                            Vibez ist berechtigt, ein Nutzerkonto bei schwerwiegendem oder wiederholtem Missbrauch, bei Verstössen gegen diese AGB oder bei betrügerischem bzw. manipulierendem Verhalten vorübergehend zu sperren oder dauerhaft und sofort zu kündigen.
                        </p>
                        <p className="mb-2">
                            Eine Sperrung oder Kündigung kann insbesondere erfolgen, wenn der Nutzer die Vibez-Angebote missbräuchlich nutzt, Zugangsdaten mit anderen Personen teilt, versucht, Rabattbedingungen zu umgehen oder andere Nutzer, Partnerrestaurants oder Vibez zu schädigen.
                        </p>
                        <p>
                            Bei einer Sperrung oder Kündigung aus einem vom Nutzer zu vertretenden Grund besteht grundsätzlich kein Anspruch auf Rückerstattung bereits bezahlter Beträge, soweit gesetzlich zulässig.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">12. Haftungsbeschränkung</h2>
                        <p className="mb-2">Die Haftung des Anbieters ist – soweit gesetzlich zulässig – ausgeschlossen.</p>
                        <p className="mb-2 font-medium">Insbesondere keine Haftung für:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Schäden durch Restaurantbesuche</li>
                            <li>Preisänderungen</li>
                            <li>falsche Partnerangaben</li>
                            <li>kein gewährter Rabatt</li>
                            <li>Falsche Speisenangaben oder für die Dienstleistung einer unserer Partnerbetriebe</li>
                        </ul>
                    </section>

                    {/* Section 13 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">13. Änderungen der Leistungen</h2>
                        <p className="mb-2">Der Anbieter darf:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Restaurants hinzufügen oder entfernen</li>
                            <li>Preise ändern</li>
                            <li>Funktionen anpassen</li>
                        </ul>
                    </section>

                    {/* Section 14 */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">14. Anwendbares Recht</h2>
                        <p className="mb-1"><strong>Anwendbares Recht:</strong> Schweizer Recht.</p>
                        <p><strong>Gerichtsstand:</strong> Sitz des Anbieters (Suhr, Schweiz).</p>
                    </section>

                    {/* Footer Nav Links */}
                    <div className="pt-8 border-t border-zinc-200 flex justify-between items-center text-sm">
                        <Link href="/policy" className="text-blue-600 font-medium hover:underline">
                            Zur Datenschutzerklärung →
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
