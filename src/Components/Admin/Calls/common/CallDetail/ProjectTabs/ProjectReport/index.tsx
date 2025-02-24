import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { useAppSelector } from '@/Redux/Hooks';
import {TabPane} from "reactstrap";
import {imageBaseUrl} from "@/services/axios";
import {ImagePath} from "@/Constant";


const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: '90vh',
    },
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        marginBottom: 4,
        lineHeight: 1.4,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    header: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft:30
    },
    headerTextItem: {
        fontSize: 10,
        marginBottom: 2,
        marginLeft:35
    },
    imageLogo: {
        width: 50,
        height: 50,
    },
    list: {
        marginLeft: 10,
    },
    listItem: {
        marginBottom: 4,
    },
});

const ProjectPDF = ({ projectData }: { projectData: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image src={`${ImagePath}/logo/logo-g.png`} style={styles.imageLogo} />
                <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Centre d’Innovation de Lubumbashi</Text>
                    <Text style={styles.headerTextItem}>Avenue des Usines, Makomeno</Text>
                    <Text style={styles.headerTextItem}>221 Lubumbashi, Haut-Katanga RDC</Text>
                    <Text style={styles.headerTextItem}>Site web: www.cinolu.org</Text>
                    <Text style={styles.headerTextItem}>E-mail: compta@cinolu.org</Text>
                    <Text style={styles.headerTextItem}>Tel: +243 993 320 803</Text>
                </View>
            </View>


            {projectData.image && (
                <View style={styles.section}>
                    <Image
                        style={styles.image}
                        src={`${imageBaseUrl}/programs/${projectData.image}`}
                    />
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.title}>{projectData.name}</Text>
                <Text style={styles.text}>{projectData.description}</Text>
                <Text style={styles.text}>
                    <Text style={styles.subtitle}>Ville :</Text> {projectData.town}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subtitle}>Dates :</Text> {projectData.started_at} - {projectData.ended_at}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Objectifs</Text>
                <Text style={styles.text}>{projectData.aim}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Public Cible</Text>
                <Text style={styles.text}>{projectData.targeted_audience}</Text>
            </View>

            {projectData.prize && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Récompense</Text>
                    <Text style={styles.text}>{projectData.prize}</Text>
                </View>
            )}

            {projectData.types?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Types</Text>
                    <View style={styles.list}>
                        {projectData.types.map((type: any) => (
                            <Text key={type.id} style={styles.listItem}>
                                - {type.name}: {type.description}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {projectData.phases?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Phases</Text>
                    <View style={styles.list}>
                        {projectData.phases.map((phase: any) => (
                            <Text key={phase.id} style={styles.listItem}>
                                - {phase.name}: {phase.description} ({phase.started_at} - {phase.ended_at})
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {projectData.partners?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Partenaires</Text>
                    <View style={styles.list}>
                        {projectData.partners.map((partner: any) => (
                            <View key={partner.id} style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>{partner.name}</Text>: {partner.description}
                                </Text>
                                {partner.website_link && (
                                    <Text style={styles.text}>Site Web : {partner.website_link}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {projectData.categories?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Catégories</Text>
                    <View style={styles.list}>
                        {projectData.categories.map((category: any) => (
                            <Text key={category.id} style={styles.listItem}>
                                - {category.name}
                            </Text>
                        ))}
                    </View>
                </View>
            )}
        </Page>
    </Document>
);

const ProjectRapportViewer = () => {
    const { projectData } = useAppSelector((state) => state.project);

    return (
        <TabPane tabId={'4'}>
            <PDFViewer style={styles.viewer}>
                <ProjectPDF projectData={projectData} />
            </PDFViewer>
        </TabPane>
    );
};

export default ProjectRapportViewer;