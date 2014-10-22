require 'asciidoctor'
require 'erb'
require 'fileutils'

src_folder = 'src/main/asciidoc'

guard 'shell' do
  watch(/^#{src_folder}\/.*\.adoc$/) {|m|
    path = m[0][src_folder.length+1..-1]
    path = path.sub(/\.adoc$/, '.html')
    Asciidoctor.render_file(m[0], {:to_file => "target/live/#{path}", :mkdirs => true, :safe => 0, :image_dir => 'images'})
  }
  watch(/^#{src_folder}\/.*\.png$/) {|m|
    path = m[0][src_folder.length+1..-1]
    FileUtils.mkdir_p(File.dirname("target/live/#{path}"))
    FileUtils.cp(m[0], "target/live/#{path}")
  }
end
