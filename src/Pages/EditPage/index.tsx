import { Button, Col, Row, Modal, Layout, Input, Form, message,PageHeader } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Prompt, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLazyGetTemplateQuery, useSendMailMutation } from '../../Api/api';
import { success } from '../../Components/Messages';
import { logger } from '../../Utils/logger';
import { UNDOREDO } from '../../Utils/undoRedo';
import Editor from '../Editor/';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { generatePreview } from '../../Utils/previewGenerator';

const { Content } = Layout;

const LOADING_KEY = 'loading';

const EditPage = () => {
  const ref = useRef<any>(null);
  const { templateId }: { templateId: string | undefined } = useParams();
  const [trigger, { data, isError, isLoading, isSuccess }] = useLazyGetTemplateQuery();

  useEffect(() => {
    if (templateId === 'test') {
      ref.current && ref.current.loadJson(`{
  "tagName": "mjml",
  "children": [
    {
      "tagName": "mj-head",
      "attributes": {
        "css-class": null
      },
      "children": [
        {
          "tagName": "mj-title",
          "attributes": {
            "css-class": null
          },
          "children": []
        },
        {
          "tagName": "mj-style",
          "content": "YXt0ZXh0LWRlY29yYXRpb246bm9uZSFpbXBvcnRhbnR9IC5odG1sYmxvY2sge30="
        },
        {
          "tagName": "mj-attributes",
          "children": [
            {
              "tagName": "mj-text",
              "attributes": {
                "font-family": "Ubuntu,Andada Pro,Festive,Fira Sans,Georama,IM Fell English SC,Inter,Lato,Lora,Merriweather,Montserrat,Noto Sans Mono,Noto sans,Nunito,Nunito Sans,Open Sans,Open Sans Condensed,Oswald,PT Sans,Playfair Display,Poppins,Quicksand,Raleway,Roboto,Roboto Condensed,Roboto Mono,Roboto Slab,Rubix,Scheherazade New,Source Sans Pro,Ubuntu,Work Sans"
              }
            }
          ]
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Roboto",
            "href": "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Festive",
            "href": "https://fonts.googleapis.com/css2?family=Festive&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Noto Sans Mono",
            "href": "https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Open Sans",
            "href": "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Andada Pro",
            "href": "https://fonts.googleapis.com/css2?family=Andada+Pro&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Lato",
            "href": "https://fonts.googleapis.com/css2?family=Lato&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Scheherazade New",
            "href": "https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Montserrat",
            "href": "https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Roboto Condensed",
            "href": "https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Source Sans Pro",
            "href": "https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Poppins",
            "href": "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Oswald",
            "href": "https://fonts.googleapis.com/css2?family=Oswald&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Noto sans",
            "href": "https://fonts.googleapis.com/css2?family=Noto+sans&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Georama",
            "href": "https://fonts.googleapis.com/css2?family=Georama&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Roboto Mono",
            "href": "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Raleway",
            "href": "https://fonts.googleapis.com/css2?family=Raleway&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Nunito",
            "href": "https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Roboto Slab",
            "href": "https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "PT Sans",
            "href": "https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Merriweather",
            "href": "https://fonts.googleapis.com/css2?family=Merriweather&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Playfair Display",
            "href": "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Lora",
            "href": "https://fonts.googleapis.com/css2?family=Lora&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Rubix",
            "href": "https://fonts.googleapis.com/css2?family=Rubix&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "IM Fell English SC",
            "href": "https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Open Sans Condensed",
            "href": "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Inter",
            "href": "https://fonts.googleapis.com/css2?family=Inter&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Nunito Sans",
            "href": "https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Work Sans",
            "href": "https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Quicksand",
            "href": "https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Fira Sans",
            "href": "https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap"
          }
        },
        {
          "tagName": "mj-font",
          "attributes": {
            "name": "Ubuntu",
            "href": "https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
          }
        }
      ]
    },
    {
      "tagName": "mj-body",
      "attributes": {
        "css-class": " mjml-tag  identifier-mj-body-78",
        "background-color": "grey",
        "width": "600px"
      },
      "children": [
        {
          "tagName": "mj-section",
		  "attributes": {
            "align": "center",
            "background-color": "#fff",
            "border": "none",
            "border-radius": "0px",
            "color": "#ffffff",
            "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
            "font-size": "13px",
            "font-weight": "normal",
            "inner-padding": "10px 25px",
            "line-height": "120%",
            "padding": "10px 25px",
            "target": "_blank",
            "text-align": "center",
            "text-decoration": "none",
            "text-transform": "none",
            "vertical-align": "middle",
            "css-class": " mjml-tag  identifier-mj-section-5"
          },
          "children": [
            {
              "tagName": "mj-column",
			  "attributes": {
                "css-class": " mjml-tag  identifier-mj-column-4",
                "padding": "0px 0px"
              },
              "children": [
                {
                  "tagName": "mj-image",
                  "attributes": {
                    "align": "center",
                    "border": "none",
                    "border-top": "none",
                    "border-bottom": "none",
                    "border-left": "none",
                    "border-right": "none",
                    "height": "auto",
                    "padding": "0px 8px",
                    "target": "_blank",
                    "width": "auto",
                    "css-class": " mjml-tag  identifier-mj-image-6",
                    "src": "https://dev.bluepie.in/dnde.png"
                  },
				  "mutableProperties": [
                    "align",
                    "alt",
                    "border",
                    "border-top",
                    "border-bottom",
                    "border-left",
                    "border-right",
                    "border-radius",
                    "container-background-color",
                    "css-class",
                    "fluid-on-mobile",
                    "height",
                    "href",
                    "name",
                    "padding",
                    "padding-bottom",
                    "padding-left",
                    "padding-right",
                    "padding-top",
                    "rel",
                    "sizes",
                    "src",
                    "srcset",
                    "target",
                    "title",
                    "usemap",
                    "width"
                  ],
                  "mutalbePropertiesWithDefaultValues": {
                    "align": "center",
                    "alt": "",
                    "border": "none",
                    "border-top": "none",
                    "border-bottom": "none",
                    "border-left": "none",
                    "border-right": "none",
                    "border-radius": "",
                    "container-background-color": "",
                    "css-class": "",
                    "fluid-on-mobile": "",
                    "height": "auto",
                    "href": "",
                    "name": "",
                    "padding": "10px 25px",
                    "padding-bottom": "",
                    "padding-left": "",
                    "padding-right": "",
                    "padding-top": "",
                    "rel": "",
                    "sizes": "",
                    "src": "",
                    "srcset": "",
                    "target": "_blank",
                    "title": "",
                    "usemap": "",
                    "width": "100%"
                  }
                }
              ],
			    "mutableProperties": [
                "background-color",
                "inner-background-color",
                "border",
                "border-bottom",
                "border-left",
                "border-right",
                "border-top",
                "border-radius",
                "inner-border",
                "inner-border-bottom",
                "inner-border-left",
                "inner-border-right",
                "inner-border-top",
                "inner-border-radius",
                "width",
                "vertical-align",
                "padding",
                "padding-top",
                "padding-bottom",
                "padding-left",
                "padding-right",
                "css-class"
              ]
            }
          ],
		  "cannot_have": [
            "mj-section",
            "mj-column"
          ],
          "mutableProperties": [
            "background-color",
            "background-position",
            "background-position-x",
            "background-position-y",
            "background-repeat",
            "background-size",
            "background-url",
            "border",
            "border-bottom",
            "border-left",
            "border-radius",
            "border-right",
            "border-top",
            "css-class",
            "direction",
            "full-width",
            "padding",
            "padding-bottom",
            "padding-left",
            "padding-right",
            "padding-top",
            "text-align"
          ]
        }
      ]
    }
  ],
  "attributes": {
    "css-class": null
  }
}`);
    }
    else if (templateId === 'new' || typeof templateId === 'undefined') {
      ref.current && ref.current.loadJson(null);
    } else {
      if (templateId) {
        message.loading({ content: 'Fetching Template...', key: LOADING_KEY, duration: 0 });
        trigger({ id: templateId });
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      try {
        ref.current && ref.current.loadJson(data.response.data);
      } catch (e) {
        message.error('Unable to load template', 3);
      }
    } else if (isSuccess && !data) {
      message.error('Template is empty', 2);
    }
    if (isSuccess) {
      message.destroy(LOADING_KEY);
    }
    if (isError) {
      message.info('Network error, template not fetched.', 2);
    }
  }, [isError, isLoading, isSuccess, data]);

  const copyJsonInClipBoard = (e: any) => {
    if (ref.current) {
      e.preventDefault();
      const json = ref.current.getJson();
      logger.log('json', json);
      navigator.clipboard.writeText(json);
      success('Copied to Clipboard & logged in devtools ');
    }
  };

  const copyHTMLAsClipBoard = (e: any) => {
    if (ref.current) {
      const html = ref.current.html;
      navigator.clipboard.writeText(html);
      logger.log('html', html);
      success('Copied to clipboard & logged in devtools ');
      e.preventDefault();
    }
  };

  const copyPreviewImage = async (e: any) => {
    if (ref.current) {
      e.preventDefault();
      const html = ref.current.html;
      navigator.clipboard.writeText(await generatePreview(html));
      success('Preview Image Copied to clipboard');
    }
  };

  return (
    <div style={{ flex: '1', display: 'flex', width: '100%', height: '100%' }}>
      <Row style={{ height: '100%', width: '100%' }} justify="center">
        <Prompt
          when={UNDOREDO.undo.length > 1 || UNDOREDO.redo.length > 1}
          message={() => 'Are you sure you want to leave, your changes will be lost'}
        />
        <Col lg={24} xl={0}>
          <div style={{ textAlign: 'center', padding: '40px', paddingTop: '10%' }}>
            <h3>Sorry, You need a device with a larger screen to perform editing, atleast '{'>'}=1200px'</h3>
          </div>
        </Col>
        <Col xs={0} xl={24}>
          <Layout style={{ height: '100%' }}>
             <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title="dnde"
              subTitle=""
              style={{ borderBottom: '1px solid #e8e8e8' }}
              extra={[
                <>
                  <SendTestMail editorRef={ref} key="4" />
                  <Button key="5" onClick={copyPreviewImage}>
                Copy Preview Image
              </Button> 
                  <Button key="2" onClick={copyHTMLAsClipBoard}>
                    Copy as html
                  </Button>
                  <Button key="1" onClick={copyJsonInClipBoard}>
                    Copy as json
                  </Button>
                </>,
              ]}
            ></PageHeader>
            <Content>
              <Editor ref={ref} />
            </Content>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export { EditPage };

let MESSAGEID = 'sendMailid';

const SendTestMail = ({ editorRef }: { editorRef: any }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [sendMailApi] = useSendMailMutation();

  const onOk = () => {
    form.validateFields().then(async (values) => {
      if (editorRef.current) {
        const html = editorRef.current.getHtml();
        if (html && html.trim().length > 0) {
          message.loading({ content: 'mail is being sent', key: MESSAGEID, duration: 0 });
          setVisible(false);
          const result = (await sendMailApi({
            to: values.email,
            html: editorRef.current.getHtml(),
          })
            .unwrap()
            .catch((e) => {
              message.error({ content: 'unable to contact server', key: MESSAGEID, duration: 0 });
            })) as any;
          if (result) {
            if (result.success) {
              message.success({ content: result.success, key: MESSAGEID, duration: 4 });
            } else if (result.error) {
              message.error({ content: result.error, key: MESSAGEID, duration: 2 });
            }
          }
        } else {
          message.error('design can not be converted into html');
        }
        setVisible(false);
      } else {
        setVisible(false);
      }
    });
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button key="2" type="primary" onClick={() => setVisible(!visible)}>
        Send Test Mail
      </Button>
      <CustomModal
        closable={false}
        title={null}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="sendMail"
        cancelText="cancel"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Email"
            validateTrigger="onchange"
            name="email"
            rules={[{ required: true }, { type: 'email' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </CustomModal>
    </>
  );
};

const CustomModal = styled(Modal)`
  .ant-modal-footer {
    border-top: unset;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-modal-footer {
    padding-top: 0px;
  }
`;

const modalConfirmLoadLocalState = async (okCallback: () => void, cancelCallback: () => void) => {
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'local save found do you want to load it?',
      okText: 'restore',
      cancelText: 'cancel',
      onOk: () => {
        okCallback();
        resolve(true);
      },
      onCancel: () => {
        cancelCallback();
        resolve(false);
      },
    });
  });
};
