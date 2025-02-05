'use client';
import { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon, Heading1, Heading2, Code, Undo, Redo } from 'lucide-react';
import { Button } from './ui/button';

// Add required styles
const editorStyles = `
  .ProseMirror {
    min-height: 400px;
    padding: 1rem;
    outline: none;
  }

  .ProseMirror h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 1em 0;
  }

  .ProseMirror h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 1em 0;
  }

  .ProseMirror p {
    margin: 1em 0;
  }

  .ProseMirror ul {
    list-style-type: disc;
    padding-left: 1.5em;
    margin: 1em 0;
  }

  .ProseMirror ol {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin: 1em 0;
  }

  .ProseMirror code {
    background-color: #f1f1f1;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  .ProseMirror pre {
    background-color: #f1f1f1;
    padding: 1em;
    border-radius: 5px;
    font-family: monospace;
    margin: 1em 0;
  }

  .ProseMirror blockquote {
    border-left: 3px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 1em;
    font-style: italic;
  }

  .ProseMirror em {
    font-style: italic;
  }

  .ProseMirror strong {
    font-weight: bold;
  }
`;

const BlogEditor = ({ content, onChange }: { content: string, onChange: (html: string) => void }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const MenuBar = () => {
    const addLink = useCallback(() => {
      if (linkUrl) {
        editor
          .chain()
          .focus()
          .setLink({ href: linkUrl })
          .run();
        setLinkUrl('');
        setIsLinkModalOpen(false);
      }
    }, [editor, linkUrl]);

    return (
      <div className="border border-gray-200 rounded-t-lg p-2 bg-white flex flex-wrap gap-1 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
          type="button"
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
          type="button"
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsLinkModalOpen(true)}
          className={editor.isActive('link') ? 'bg-gray-200' : ''}
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <div className="border-l border-gray-300 mx-2 h-6" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          type="button"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          type="button"
        >
          <Redo className="h-4 w-4" />
        </Button>

        {isLinkModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="border rounded p-2 mb-2 w-full"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsLinkModalOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button onClick={addLink} type="button">
                  Add Link
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border rounded-lg">
      <style>{editorStyles}</style>
      <MenuBar />
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;